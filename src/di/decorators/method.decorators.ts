import "reflect-metadata";
import { actionSymbol } from "./symbols";

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
    actionId?: string;
    blockId?: string;
    value?: string;
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

export const ButtonAction = (
    actionId: string,
    blockId: string
): MethodDecorator => (target: any, propertyKey: string | Symbol) => {
    storeActionMetadata(target, propertyKey, {
        type: "button",
        actionId,
        blockId
    });
};

export const SelectOptionAction = (
    actionId: string,
    blockId?: string
): MethodDecorator => (target: any, propertyKey: string | Symbol) => {
    storeActionMetadata(target, propertyKey, {
        type: "static_select",
        actionId,
        blockId
    });
};

export const SelectOptionsAction = (
    actionId: string,
    blockId?: string
): MethodDecorator => (target: any, propertyKey: string | Symbol) => {
    storeActionMetadata(target, propertyKey, {
        type: "multi_static_select",
        actionId,
        blockId
    });
};

export const OverflowAction = (
    actionId: string,
    blockId?: string
): MethodDecorator => (target: any, propertyKey: string | Symbol) => {
    storeActionMetadata(target, propertyKey, {
        type: "overflow",
        actionId,
        blockId
    });
};

export const DatepickerAction = (
    actionId: string,
    blockId?: string
): MethodDecorator => (target: any, propertyKey: string | Symbol) => {
    storeActionMetadata(target, propertyKey, {
        type: "datepicker",
        actionId,
        blockId
    });
};

export const ActionByValue = (value: string): MethodDecorator => (
    target: any,
    propertyKey: string | symbol
) => {
    storeActionMetadata(target, propertyKey, {
        type: "value",
        value
    });
};
