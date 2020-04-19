import { expect } from "chai";

import { getInteractiveMessagePayloadWithActions } from "../utils/slack-payload";
import { handlePayload, clearStore, register } from "../../core";
import { Actions, ButtonAction, Value } from "../../decorators";

describe("should return unhandled action string literal", () => {
    beforeEach(() => {
        clearStore();
    });
    it("should return unhandled action string literal", async () => {
        @Actions()
        class JhamakuJhama {
            @ButtonAction("action1", "block1")
            async tinguRanga(@Value() value: string) {
                return value;
            }
        }
        register([JhamakuJhama]);
        const payload = getInteractiveMessagePayloadWithActions([
            {
                type: "button",
                block_id: "kjshdjfhsdjf",
                action_id: "lkjsdklfjk",
                text: {
                    type: "plain_text",
                    text: "Button 1",
                    emoji: true,
                },
                value: "lasku-tapa",
                action_ts: "action_ts",
            },
        ]);

        const result = await handlePayload(payload);
        expect(result).equals("Unhandled Action");
    });
});
