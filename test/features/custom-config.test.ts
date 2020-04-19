import { expect } from "chai";

import { Actions, ButtonAction, Value, ActionByValue } from "../../decorators";
import { register, handlePayload, clearStore } from "../../core";
import { getInteractiveMessagePayloadWithActions } from "../utils/slack-payload";

describe("should work with custom configuration", () => {
    beforeEach(() => {
        clearStore();
    });
    it("should hit value handler, but not button handler", async () => {
        @Actions()
        class ActionsWithBlocks {
            @ButtonAction("action1", "block1")
            async actionWithBlock(@Value() value: string) {
                return value;
            }
        }

        @Actions()
        class WithHighestPriority {
            @ActionByValue(() => true, null, null, 1)
            async alwaysTrue() {
                return true;
            }
        }

        register([ActionsWithBlocks, WithHighestPriority], {
            priorities: ["Value", "ActionsWithBlocks"],
        });

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
                value: "regex-value",
                action_ts: "action_ts",
            },
        ]);

        const result = await handlePayload(payload);
        expect(result).true;
    });
});
