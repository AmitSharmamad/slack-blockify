import { expect } from "chai";

import { getInteractiveMessagePayloadWithActions } from "../utils/slack-payload";
import { register, handlePayload, clearStore } from "../../core";
import { Actions, ButtonAction, Value } from "../../decorators";

describe("should identity the overflow action", () => {
    beforeEach(() => {
        clearStore();
    });
    it("overflow with action and block", async () => {
        @Actions()
        class OverflowActionsWithBlocks {
            @ButtonAction("action1", "block1")
            async handleActionWithBlock(@Value() value: string) {
                return value;
            }
        }
        register([OverflowActionsWithBlocks]);

        const payload = getInteractiveMessagePayloadWithActions([
            {
                type: "overflow",
                block_id: "block1",
                action_id: "action1",
                selected_option: {
                    text: {
                        type: "plain_text",
                        text: "Option 1",
                        emoji: true,
                    },
                    value: "value1",
                },
                action_ts: "1586368963.382286",
            },
        ]);

        const result = await handlePayload(payload);
        expect(result).equals("value1");
    });
});
