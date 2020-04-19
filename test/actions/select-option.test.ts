import { expect } from "chai";

import { getInteractiveMessagePayloadWithActions } from "../utils/slack-payload";
import { register, handlePayload, clearStore } from "../../core";
import { Actions, SelectOptionAction, Value } from "../../decorators";

describe("should identify the static select option", () => {
    beforeEach(() => {
        clearStore();
    });
    it("select option with action and block", async () => {
        @Actions()
        class SelectOptionActionsWithBlocks {
            @SelectOptionAction("action1", "block1")
            async handleActionWithBlock(@Value() value: string) {
                return value;
            }
        }
        register([SelectOptionActionsWithBlocks]);

        const payload = getInteractiveMessagePayloadWithActions([
            {
                type: "static_select",
                block_id: "block1",
                action_id: "action1",
                selected_option: {
                    text: {
                        type: "plain_text",
                        text: "Choice 1",
                        emoji: true,
                    },
                    value: "value1",
                },
                placeholder: {
                    type: "plain_text",
                    text: "Select an item",
                    emoji: true,
                },
                action_ts: "1586367417.781375",
            },
        ]);

        const result = await handlePayload(payload);
        expect(result).equals("value1");
    });
});
