import { expect } from "chai";

import { getInteractiveMessagePayloadWithActions } from "../utils/slack-payload";
import { register, handlePayload, clearStore } from "../../core";
import { Actions, Value, DatepickerAction } from "../../decorators";

describe("should identity the datepicker action", () => {
    beforeEach(() => {
        clearStore();
    });
    it("datepicker with action and block", async () => {
        @Actions()
        class DatepickerActionsWithBlocks {
            @DatepickerAction("action1", "block1")
            async handleActionWithBlock(@Value() value: string) {
                return value;
            }
        }
        register([DatepickerActionsWithBlocks]);

        const payload = getInteractiveMessagePayloadWithActions([
            {
                type: "datepicker",
                block_id: "block1",
                action_id: "action1",
                selected_date: "1990-04-28",
                initial_date: "1990-04-28",
                action_ts: "1586368892.858078",
            },
        ]);

        const result = await handlePayload(payload);
        expect(result).equals("1990-04-28");
    });
});
