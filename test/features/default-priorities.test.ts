import { expect } from "chai";

import { Actions, ButtonAction, Value, ActionByValue } from "../../decorators";
import { register, handlePayload, clearStore } from "../../core";
import { getInteractiveMessagePayloadWithActions } from "../utils/slack-payload";

describe("should pass priority test", () => {
    before(() => {
        clearStore();

        @Actions()
        class ActionsWithBlocks {
            @ButtonAction("action1", "block1")
            async actionWithBlock(@Value() value: string) {
                return value;
            }
        }

        @Actions()
        class WithActions {
            @ButtonAction("action2")
            async actionWithoutBlock(@Value() value: string) {
                return value;
            }
        }

        @Actions()
        class WithBlocks {
            @ButtonAction(null, "block3")
            async blockWithoutAction(@Value() value: string) {
                return value;
            }
        }

        @Actions()
        class WithValue {
            @ActionByValue("action-value")
            async actionByValue(@Value() value: string) {
                return value;
            }

            @ActionByValue(/^regex.+/)
            async regexValue() {
                return "regex value";
            }

            @ActionByValue("regex-value")
            async stringValue() {
                return "string value";
            }
        }

        @Actions()
        class WithValues {
            @ActionByValue(["v1", "v2", "v3"])
            async actionsByValue(@Value() value: string) {
                return value;
            }
        }

        @Actions()
        class WithValueValidator {
            @ActionByValue((value) => value === "value validator")
            async actionValidator(@Value() value: string) {
                return value;
            }
        }

        register([
            ActionsWithBlocks,
            WithActions,
            WithBlocks,
            WithValue,
            WithValues,
            WithValueValidator,
        ]);
    });

    it("should identify the action with action and block id", async () => {
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
                value: "action_with_block",
                action_ts: "action_ts",
            },
        ]);

        const result = await handlePayload(payload);
        expect(result).equals("action_with_block");
    });

    it("should identity the action with only action", async () => {
        const payload = getInteractiveMessagePayloadWithActions([
            {
                type: "button",
                action_id: "action2",
                text: {
                    type: "plain_text",
                    text: "Button 1",
                    emoji: true,
                },
                value: "action_without_block",
                action_ts: "action_ts",
            },
        ]);

        const result = await handlePayload(payload);
        expect(result).equals("action_without_block");
    });

    it("should identify the action with only block", async () => {
        const payload = getInteractiveMessagePayloadWithActions([
            {
                type: "button",
                block_id: "block3",
                text: {
                    type: "plain_text",
                    text: "Button 1",
                    emoji: true,
                },
                value: "block_without_action",
                action_ts: "action_ts",
            },
        ]);

        const result = await handlePayload(payload);
        expect(result).equals("block_without_action");
    });

    it("should identify the action with an action value", async () => {
        const payload = getInteractiveMessagePayloadWithActions([
            {
                type: "button",
                block_id: "lkjfalkj",
                action_id: "lhaksjhlk",
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

    it("should identify the action with a list of action values", async () => {
        const payload = getInteractiveMessagePayloadWithActions([
            {
                type: "button",
                block_id: "lkjfalkj",
                action_id: "lhaksjhlk",
                text: {
                    type: "plain_text",
                    text: "Button 1",
                    emoji: true,
                },
                value: "v1",
                action_ts: "action_ts",
            },
        ]);

        const result = await handlePayload(payload);
        expect(result).equals("v1");
    });

    it("should identify the action with a value validator", async () => {
        const payload = getInteractiveMessagePayloadWithActions([
            {
                type: "button",
                block_id: "lkjfalkj",
                action_id: "lhaksjhlk",
                text: {
                    type: "plain_text",
                    text: "Button 1",
                    emoji: true,
                },
                value: "value validator",
                action_ts: "action_ts",
            },
        ]);

        const result = await handlePayload(payload);
        expect(result).equals("value validator");
    });

    it("should identify regex action with value regex-value", async () => {
        const payload = getInteractiveMessagePayloadWithActions([
            {
                type: "button",
                block_id: "lkjfalkj",
                action_id: "lhaksjhlk",
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
        expect(result).equals("regex value");
    });
});
