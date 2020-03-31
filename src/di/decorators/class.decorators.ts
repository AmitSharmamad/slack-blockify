import "reflect-metadata";

import { actionSymbol } from "./symbols";
import { Container } from "../store";
import { ActionMetadata } from "./method.decorators";

export const Actions = (): ClassDecorator => (target: any) => {
    const actions = Reflect.getOwnMetadata(actionSymbol, target.prototype);
    const t = new target();
    actions?.forEach((action: ActionMetadata) => {
        if (action.options) {
            const { actionId, blockId, value } = action.options;
            const fn = t[action.name];
            Container.setHandler(
                {
                    actionId: actionId as string,
                    blockId: blockId as string,
                    value
                },
                {
                    fn,
                    target,
                    fnName: action.name,
                    options: action.options
                }
            );
        }
    });
};
