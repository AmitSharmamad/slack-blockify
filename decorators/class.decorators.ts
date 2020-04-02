import "reflect-metadata";

import { actionSymbol } from "./symbols";
import { Container } from "../core/store";
import { ActionMetadata } from "./method.decorators";

/**
 * Decorator that marks a class as an ActionsController
 *
 * Methods inside this class with the following Decorators are
 * registered as Action Handlers
 *
 * * ButtonAction
 * * SelectOptionAction
 * * SelectOptionsAction
 * * OverflowAction
 * * DatepickerAction
 * * ActionByValue
 */
export const Actions = (): ClassDecorator => (target: any) => {
    const actions = Reflect.getOwnMetadata(actionSymbol, target.prototype);
    const t = new target();
    actions?.forEach((action: ActionMetadata) => {
        if (action.options) {
            const { actionId, blockId, values } = action.options;
            const fn = t[action.name];
            Container.setHandler(
                {
                    actionId,
                    blockId,
                    values
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
