import "reflect-metadata";

type TokenType =
    | "team"
    | "user"
    | "api_app_id"
    | "token"
    | "container"
    | "trigger_id"
    | "response_url"
    | "actions"
    | "value"
    | "values"
    | "payload";

const storeTokenInfo = (
    target: any,
    name: any,
    idx: number,
    type: TokenType
) => {
    const tokens = Reflect.getOwnMetadata(name, target) || [];
    tokens.push({
        type,
        idx
    });
    Reflect.defineMetadata(name, tokens, target);
};

/**
 * Extracts the `user` property from the payload,
 * and populates the decorated parameter with the value
 */
export const UserInfo = (): ParameterDecorator => (
    target: any,
    property: any,
    idx: number
) => storeTokenInfo(target, property, idx, "user");

/**
 * Extracts the `team` property from the payload,
 * and populates the decorated parameter with the value
 */
export const TeamInfo = (): ParameterDecorator => (
    target: any,
    property: any,
    idx: number
) => storeTokenInfo(target, property, idx, "team");

/**
 * Extracts the `api_app_id` property from the payload,
 * and populates the decorated parameter with the value
 */
export const ApiAppId = (): ParameterDecorator => (
    target: any,
    property: any,
    idx: number
) => storeTokenInfo(target, property, idx, "api_app_id");

/**
 * Extracts the `token` property from the payload,
 * and populates the decorated parameter with the value
 */
export const Token = (): ParameterDecorator => (
    target: any,
    property: any,
    idx: number
) => storeTokenInfo(target, property, idx, "token");

/**
 * Extracts the `container` property from the payload,
 * and populates the decorated parameter with the value
 */
export const ContainerInfo = (): ParameterDecorator => (
    target: any,
    property: any,
    idx: number
) => storeTokenInfo(target, property, idx, "container");

/**
 * Extracts the `trigger_id` property from the payload,
 * and populates the decorated parameter with the value
 */
export const TriggerId = (): ParameterDecorator => (
    target: any,
    property: any,
    idx: number
) => storeTokenInfo(target, property, idx, "trigger_id");

/**
 * Extracts the `response_url` property from the payload,
 * and populates the decorated parameter with the value
 */
export const ResponseUrl = (): ParameterDecorator => (
    target: any,
    property: any,
    idx: number
) => storeTokenInfo(target, property, idx, "response_url");

/**
 * Extracts the `actions` property from the payload,
 * and populates the decorated parameter with the value
 */
export const ActionsInfo = (): ParameterDecorator => (
    target: any,
    property: any,
    idx: number
) => storeTokenInfo(target, property, idx, "actions");

/**
 * Populates the decorated parameter with the entire payload
 */
export const PayloadInfo = (): ParameterDecorator => (
    target: any,
    property: any,
    idx: number
) => storeTokenInfo(target, property, idx, "payload");

/**
 * Extracts the `value` property from the respective action type,
 * and populates the decorated parameter with the value
 *
 * Should not be used on `multi_select` action type handlers
 */
export const Value = (): ParameterDecorator => (
    target: any,
    property: any,
    idx: number
) => storeTokenInfo(target, property, idx, "value");

/**
 * Should be used strictly on `multi_select` action type handlers
 * Extracts the `values` from a `multi_select` action type's options,
 * and populates the decorated parameter with the list of values
 */
export const Values = (): ParameterDecorator => (
    target: any,
    property: any,
    idx: number
) => storeTokenInfo(target, property, idx, "values");
