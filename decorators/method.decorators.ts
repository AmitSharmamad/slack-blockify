import "reflect-metadata";
import { actionSymbol } from "./symbols";

export type ExpressionType = string | RegExp;
export type ValueType = ExpressionType | ExpressionType[];

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
}

const storeActionMetadata = (
    target: any,
    name: string | Symbol,
    options?: Options
) => {
    const actions = Reflect.getOwnMetadata(actionSymbol, target) || [];
    actions.push({
        name,
        options
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
    blockId?: ExpressionType
): MethodDecorator => (target: any, propertyKey: string | Symbol) => {
    storeActionMetadata(target, propertyKey, {
        type: "button",
        actionId,
        blockId
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
    blockId?: ExpressionType
): MethodDecorator => (target: any, propertyKey: string | Symbol) => {
    storeActionMetadata(target, propertyKey, {
        type: "static_select",
        actionId,
        blockId
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
    blockId?: ExpressionType
): MethodDecorator => (target: any, propertyKey: string | Symbol) => {
    storeActionMetadata(target, propertyKey, {
        type: "multi_static_select",
        actionId,
        blockId
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
    blockId?: ExpressionType
): MethodDecorator => (target: any, propertyKey: string | Symbol) => {
    storeActionMetadata(target, propertyKey, {
        type: "overflow",
        actionId,
        blockId
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
    blockId?: ExpressionType
): MethodDecorator => (target: any, propertyKey: string | Symbol) => {
    storeActionMetadata(target, propertyKey, {
        type: "datepicker",
        actionId,
        blockId
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
    values: ExpressionType | ExpressionType[],
    actionId?: ExpressionType,
    blockId?: ExpressionType
): MethodDecorator => (target: any, propertyKey: string | Symbol) => {
    storeActionMetadata(target, propertyKey, {
        type: "value",
        values,
        actionId,
        blockId
    });
};
