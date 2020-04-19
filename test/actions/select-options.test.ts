import { expect } from "chai";

import { getInteractiveMessagePayloadWithActions } from "../utils/slack-payload";
import { register, handlePayload, clearStore } from "../../core";
import { Actions, SelectOptionAction, Values } from "../../decorators";

describe("should identify select options action", () => {
    beforeEach(() => {
        clearStore();
    });
    it("select options with action and block", async () => {
        @Actions()
        class SelectOptionsActionsWithBlocks {
            @SelectOptionAction("action1", "block1")
            async handleActionWithBlock(@Values() values: string[]) {
                return values;
            }
        }
        register([SelectOptionsActionsWithBlocks]);

        const payload = getInteractiveMessagePayloadWithActions([
            {
                type: "multi_static_select",
                block_id: "block1",
                action_id: "action1",
                selected_options: [
                    {
                        text: {
                            type: "plain_text",
                            text: "Choice 1",
                            emoji: true,
                        },
                        value: "value1",
                    },
                    {
                        text: {
                            type: "plain_text",
                            text: "Choice 2",
                            emoji: true,
                        },
                        value: "value2",
                    },
                    {
                        text: {
                            type: "plain_text",
                            text: "Choice 3",
                            emoji: true,
                        },
                        value: "value3",
                    },
                ],
                placeholder: {
                    type: "plain_text",
                    text: "Select items",
                    emoji: true,
                },
                action_ts: "1586368271.203445",
            },
        ]);

        const result = await handlePayload(payload);
        expect(result instanceof Array).true;
        expect(result).includes("value1").includes("value2").includes("value3");
    });
});
