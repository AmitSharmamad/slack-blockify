import {
    Options,
    ExpressionType,
    ValueType
} from "../decorators/method.decorators";
import { InteractiveMessagePayload } from "../types/payloads";

interface Metadata {
    target: any;
    fnName: string;
    fn: Function;
    options: Options;
}

interface MappingOptions {
    actionId: ExpressionType;
    blockId: ExpressionType;
    values: ValueType;
}

const check = (actual: string, expected: ExpressionType) => {
    return (
        (expected instanceof RegExp && expected.test(actual)) ||
        (typeof expected === "string" && actual === expected)
    );
};

export class Container {
    private static stores: {
        actionId: ExpressionType;
        blockId: ExpressionType;
        values: ValueType;
        metadata: Metadata;
    }[] = [];
    static setHandler(options: Partial<MappingOptions>, metadata: Metadata) {
        const { actionId, blockId, values } = options;
        this.stores.push({
            actionId,
            blockId,
            values,
            metadata
        });
    }
    static getHandler(
        options: Partial<{
            actionId: string;
            blockId: string;
            value: string;
            actionType: string;
        }>
    ): Metadata {
        const { actionId, blockId, value, actionType } = options;
        return (
            this.stores.find(action => {
                if (
                    !action.values &&
                    actionType !== action.metadata.options.type
                ) {
                    return false;
                }
                // #1 Checking the regex
                if (action?.values instanceof RegExp) {
                    return true;
                }
                // #2 Checking String
                if (typeof action?.values === "string") {
                    return true;
                }
                // #3 Checking values array
                if (action?.values instanceof Array) {
                    for (const v of action.values) {
                        if (check(value, v)) {
                            return true;
                        }
                    }
                }
                // #4 Checing Action with a Block
                if (action.actionId && action.blockId) {
                    if (
                        check(actionId, action.actionId) &&
                        check(blockId, action.blockId)
                    ) {
                        return true;
                    }
                }
                // #5 Checking Action
                if (action.actionId) {
                    if (check(actionId, action.actionId)) {
                        return true;
                    }
                }
                // #6 Checking Block
                if (action.blockId) {
                    if (check(blockId, action.blockId)) {
                        return true;
                    }
                }
                return false;
            })?.metadata || null
        );
    }
}

const getValue = (payload: InteractiveMessagePayload) => {
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

const getValues = (payload: InteractiveMessagePayload) => {
    const [action] = payload.actions;
    switch (action.type) {
        case "multi_static_select":
            return action.selected_options.map((option: any) => option.value);
        default:
            return null;
    }
};

const getArgs = (tokens: any[], payload: InteractiveMessagePayload) => {
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

/**
 *
 * @param payload slack's block_actions payload
 * @returns Unhandled Action or the Provided Type <T>
 */
export const handlePayload = async <Response>(
    payload: InteractiveMessagePayload
): Promise<"Unhandled Action" | Response> => {
    if (payload.type !== "block_actions")
        throw `Only block actions are supported for now`;
    const [action] = payload.actions;
    const actionId = action.action_id;
    const blockId = action.block_id;
    const actionType = action.type;
    const value = getValue(payload);
    const actionToHandle = Container.getHandler({
        actionId,
        blockId,
        value,
        actionType
    });
    if (!actionToHandle) return "Unhandled Action";
    if (actionToHandle?.fn && actionToHandle?.target) {
        const tokens: {
            type: string;
            idx: number;
        }[] = Reflect.getOwnMetadata(
            actionToHandle?.fnName,
            actionToHandle?.target.prototype
        );
        return actionToHandle.fn?.(...getArgs(tokens, payload));
    }
    return "Unhandled Action";
};

/**
 * Registers the provided classes that are decorated with Actions
 * @param classes
 */
export const register = (...classes: any[]) => {
    classes;
};
