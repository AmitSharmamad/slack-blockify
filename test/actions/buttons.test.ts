import { expect } from "chai";

import { getInteractiveMessagePayloadWithActions } from "../utils/slack-payload";
import { register, handlePayload, clearStore } from "../../core";
import { Actions, ButtonAction, Value } from "../../decorators";

describe("should identity the button action", () => {
    beforeEach(() => {
        clearStore();
    });
    it("buttons with action and block", async () => {
        @Actions()
        class ButtonsActionsWithBlocks {
            @ButtonAction("action1", "block1")
            async handleActionWithBlock(@Value() value: string) {
                return value;
            }
        }
        register([ButtonsActionsWithBlocks]);

        const payload = getInteractiveMessagePayloadWithActions([
            {
                type: "button",
                block_id: "block1",
                action_id: "action1",
                text: {
                    type: "plain_text",
                    text: "Button 1",
                    emoji: true,
                },
                value: "value1",
                action_ts: "action_ts",
            },
        ]);

        const result = await handlePayload(payload);
        expect(result).equals("value1");
    });
});
