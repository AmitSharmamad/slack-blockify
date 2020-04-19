import { expect } from "chai";

import { Actions, ActionByValue, ButtonAction, Value } from "../../decorators";
import { register, handlePayload, clearStore } from "../../core";
import { getInteractiveMessagePayloadWithActions } from "../utils/slack-payload";

describe("should execute with custom priorities", () => {
    beforeEach(() => {
        clearStore();
    });
    it("should execute value handler", async () => {
        @Actions()
        class WithFirstPriority {
            @ActionByValue(() => true, null, null, 1)
            async itsOnlyMe() {
                return "first-priority";
            }
        }

        @Actions()
        class WithSecondPriority {
            @ButtonAction("action1", null, 2)
            async buttonAction(@Value() value: string) {
                return value;
            }
        }

        register([WithFirstPriority, WithSecondPriority], {
            priorities: ["Value", "Actions"],
        });

        const payload = getInteractiveMessagePayloadWithActions([
            {
                type: "button",
                block_id: "lkjfalkj",
                action_id: "action1",
                text: {
                    type: "plain_text",
                    text: "Button 1",
                    emoji: true,
                },
                value: "action-value",
                action_ts: "action_ts",
            },
        ]);

        const result = await handlePayload(payload);
        expect(result).equals("first-priority");
    });

    it("should execute button handler", async () => {
        @Actions()
        class WithFirstPriority {
            @ActionByValue((value) => value === "regex-value", null, null)
            async itsOnlyMe() {
                return "action-by-value";
            }
        }

        @Actions()
        class WithSecondPriority {
            @ButtonAction("action1", null, 2)
            async buttonAction(@Value() value: string) {
                return value;
            }
        }

        register([WithFirstPriority, WithSecondPriority], {
            priorities: ["Value", "Actions"],
        });

        const payload = getInteractiveMessagePayloadWithActions([
            {
                type: "button",
                block_id: "lkjfalkj",
                action_id: "action1",
                text: {
                    type: "plain_text",
                    text: "Button 1",
                    emoji: true,
                },
                value: "action-value",
                action_ts: "action_ts",
            },
        ]);

        const result = await handlePayload(payload);
        expect(result).equals("action-value");
    });
});
