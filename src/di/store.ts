import { MessagePayload } from "../payloads";
import { Options } from "./decorators/method.decorators";

interface Metadata {
    target: any;
    fnName: string;
    fn: Function;
    options: Options;
}

interface MappingOptions {
    actionId: string;
    blockId: string;
    value: string;
}

export class Container {
    private static _values: {
        [value: string]: Metadata;
    } = {};
    private static _actions: {
        [name: string]: Metadata;
    } = {};
    private static _blocks: {
        [name: string]: Metadata;
    } = {};
    private static _actionsWithBlocks: {
        [name: string]: {
            [name: string]: Metadata;
        };
    } = {};
    static setHandler(options: Partial<MappingOptions>, metadata: Metadata) {
        const { actionId, blockId, value } = options;
        if (value) {
            this._values[value] = metadata;
        } else if (actionId && blockId) {
            this._actionsWithBlocks[blockId] = {
                [actionId]: metadata
            };
        } else if (actionId) {
            this._actions[actionId] = metadata;
        } else if (blockId) {
            this._blocks[blockId] = metadata;
        } else throw `Invalid Options`;
    }
    static getHandler(options: Partial<MappingOptions>) {
        const { actionId, blockId, value } = options;
        console.log(value);
        if (value) return this._values[value];
        if (actionId && blockId)
            return this._actionsWithBlocks[blockId]?.[actionId];
        if (actionId) return this._actions[actionId];
        if (blockId) return this._actions[blockId];
        throw `Invalid Handler`;
    }
}

const getValue = (payload: MessagePayload) => {
    const [action] = payload.actions;
    switch (action.type) {
        case "button":
            return action.value;
        case "static_select":
        case "overflow":
            return action.selected_option.value;
        case "datepicker":
            return action.selected_date;
        default:
            return null;
    }
};

const getValues = (payload: MessagePayload) => {
    const [action] = payload.actions;
    switch (action.type) {
        case "multi_static_select":
            return action.selected_options.map((option: any) => option.value);
        default:
            return null;
    }
};

const getArgs = (tokens: any[], payload: MessagePayload) => {
    if (!tokens?.length) return [];
    let highestIndex = 0;
    const data = tokens?.sort((t1, t2) => {
        if (t1.idx > highestIndex) highestIndex = t1.idx;
        if (t2.idx > highestIndex) highestIndex = t2.idx;
        return t1.idx.toString().localeCompare(t2.idx.toString());
    });
    const args = new Array(highestIndex);
    return data.reduce((results, d) => {
        if (d.type === "value") {
            args[d.idx] = getValue(payload);
        } else if (d.type === "values") {
            args[d.idx] = getValues(payload);
        } else args[d.idx] = (payload as any)[d.type];
        return results;
    }, args);
};

export const handlePayload = async <Response>(
    payload: MessagePayload
): Promise<"Unhandled Action" | Response> => {
    if (payload.type !== "block_actions")
        throw `Only block actions are supported for now`;
    const actionId = payload.actions[0].action_id;
    const blockId = payload.actions[0].block_id;
    const value = getValue(payload);
    const action = Container.getHandler({ actionId, blockId, value });
    if (action?.fn && action?.target) {
        const tokens: {
            type: string;
            idx: number;
        }[] = Reflect.getOwnMetadata(action?.fnName, action?.target.prototype);
        return action.fn?.(...getArgs(tokens, payload));
    }
    return "Unhandled Action";
};
