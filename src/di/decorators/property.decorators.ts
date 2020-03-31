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

export const UserInfo = (): ParameterDecorator => (
    target: any,
    property: any,
    idx: number
) => storeTokenInfo(target, property, idx, "user");

export const TeamInfo = (): ParameterDecorator => (
    target: any,
    property: any,
    idx: number
) => storeTokenInfo(target, property, idx, "team");

export const ApiAppId = (): ParameterDecorator => (
    target: any,
    property: any,
    idx: number
) => storeTokenInfo(target, property, idx, "api_app_id");

export const Token = (): ParameterDecorator => (
    target: any,
    property: any,
    idx: number
) => storeTokenInfo(target, property, idx, "token");

export const ContainerInfo = (): ParameterDecorator => (
    target: any,
    property: any,
    idx: number
) => storeTokenInfo(target, property, idx, "container");

export const TriggerId = (): ParameterDecorator => (
    target: any,
    property: any,
    idx: number
) => storeTokenInfo(target, property, idx, "trigger_id");

export const ResponseUrl = (): ParameterDecorator => (
    target: any,
    property: any,
    idx: number
) => storeTokenInfo(target, property, idx, "response_url");

export const ActionsInfo = (): ParameterDecorator => (
    target: any,
    property: any,
    idx: number
) => storeTokenInfo(target, property, idx, "actions");

export const PayloadInfo = (): ParameterDecorator => (
    target: any,
    property: any,
    idx: number
) => storeTokenInfo(target, property, idx, "payload");

export const Value = (): ParameterDecorator => (
    target: any,
    property: any,
    idx: number
) => storeTokenInfo(target, property, idx, "value");

export const Values = (): ParameterDecorator => (
    target: any,
    property: any,
    idx: number
) => storeTokenInfo(target, property, idx, "values");
