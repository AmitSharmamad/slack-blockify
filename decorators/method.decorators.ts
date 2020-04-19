import "reflect-metadata";
import { actionSymbol } from "./symbols";

export type ExpressionType = string | RegExp;
type ValueValidator = (value: string) => boolean;
export type ValueType = ExpressionType | ExpressionType[] | ValueValidator;

export type ActionType =
    | "button"
    | "static_select"
    | "multi_static_select"
    | "overflow"
    | "datepicker"
    | "value";

export interface ActionMetadata {
    type: string;
    name: string;
    options: Options;
}

export interface Options {
    type: ActionType;
    actionId?: ExpressionType;
    blockId?: ExpressionType;
    values?: ValueType;
    priority?: number;
}

const storeActionMetadata = (
    target: any,
    name: string | Symbol,
    options?: Options
) => {
    const actions = Reflect.getOwnMetadata(actionSymbol, target) || [];
    if (options?.priority == null) {
        options.priority = Infinity;
    }
    actions.push({
        name,
        options,
    });
    Reflect.defineMetadata(actionSymbol, actions, target);
};

/**
 * Registers the function as a Button Action Handler.
 *
 * @param {(RegExp|string)} actionId Unique Action Id to identify
 * @param {(RegExp|string)=} blockId Unique Block Id to identify
 */
export const ButtonAction = (
    actionId: ExpressionType,
    blockId?: ExpressionType,
    priority?: number
): MethodDecorator => (target: any, propertyKey: string | Symbol) => {
    storeActionMetadata(target, propertyKey, {
        type: "button",
        actionId,
        blockId,
        priority,
    });
};

/**
 * Registers the function as a Select (Dropdown) Action Handler.
 *
 * @param {(RegExp|string)} actionId Unique Action Id to identify
 * @param {(RegExp|string)=} blockId Unique Block Id to identify
 */
export const SelectOptionAction = (
    actionId: ExpressionType,
    blockId?: ExpressionType,
    priority?: number
): MethodDecorator => (target: any, propertyKey: string | Symbol) => {
    storeActionMetadata(target, propertyKey, {
        type: "static_select",
        actionId,
        blockId,
        priority,
    });
};

/**
 * Registers the function as a MultiSelect (Dropdown) Action Handler.
 *
 * @param {(RegExp|string)} actionId Unique Action Id to identify
 * @param {(RegExp|string)=} blockId Unique Block Id to identify
 */
export const SelectOptionsAction = (
    actionId: ExpressionType,
    blockId?: ExpressionType,
    priority?: number
): MethodDecorator => (target: any, propertyKey: string | Symbol) => {
    storeActionMetadata(target, propertyKey, {
        type: "multi_static_select",
        actionId,
        blockId,
        priority,
    });
};

/**
 * Registers the function as a Overflow Action Handler.
 *
 * @param {(RegExp|string)} actionId Unique Action Id to identify
 * @param {(RegExp|string)=} blockId Unique Block Id to identify
 */
export const OverflowAction = (
    actionId: ExpressionType,
    blockId?: ExpressionType,
    priority?: number
): MethodDecorator => (target: any, propertyKey: string | Symbol) => {
    storeActionMetadata(target, propertyKey, {
        type: "overflow",
        actionId,
        blockId,
        priority,
    });
};

/**
 * Registers the function as a Datepicker Action Handler.
 *
 * @param {(RegExp|string)} actionId Unique Action Id to identify
 * @param {(RegExp|string)=} blockId Unique Block Id to identify
 */
export const DatepickerAction = (
    actionId: ExpressionType,
    blockId?: ExpressionType,
    priority?: number
): MethodDecorator => (target: any, propertyKey: string | Symbol) => {
    storeActionMetadata(target, propertyKey, {
        type: "datepicker",
        actionId,
        blockId,
        priority,
    });
};

/**
 * Registers the function as a Value Identified Action Handler.
 *
 * @param {(RegExp|string|(RegExp|string)[])}
 * @param {(RegExp|string)=} actionId Unique Action Id to identify
 * @param {(RegExp|string)=} blockId Unique Block Id to identify
 */
export const ActionByValue = (
    values: ValueType,
    actionId?: ExpressionType,
    blockId?: ExpressionType,
    priority?: number
): MethodDecorator => (target: any, propertyKey: string | Symbol) => {
    storeActionMetadata(target, propertyKey, {
        type: "value",
        values,
        actionId,
        blockId,
        priority,
    });
};
