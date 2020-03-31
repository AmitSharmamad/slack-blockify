import "reflect-metadata";

import { User, Team } from "../di/types";

import { Actions } from "../di/decorators/class.decorators";

import {
    ButtonAction,
    SelectOptionAction,
    SelectOptionsAction,
    OverflowAction,
    ActionByValue,
    DatepickerAction
} from "../di/decorators/method.decorators";

import {
    Token,
    UserInfo,
    TeamInfo,
    Value,
    ApiAppId,
    Values
} from "../di/decorators/property.decorators";
import { handlePayload } from "../di/store";

@Actions()
export class ButtonActions {
    @ButtonAction("button", "buttons")
    async onButtonClick(
        @Token() token: string,
        @UserInfo() user: User,
        @TeamInfo() team: Team,
        @Value() value: string,
        @ApiAppId() apiAppId: string
    ) {
        console.log("user", user);
        console.log("team", team);
        console.log("token", token);
        console.log("value", value);
        console.log("api_app_id", apiAppId);
        return "approval processed";
    }
}

@Actions()
export class StaticSelectActions {
    @SelectOptionAction("select", "select-options")
    async onOptionSelection(@Value() value: string) {
        console.log("selected value", value);
        return "role change processed";
    }
}

@Actions()
export class StaticMultiSelectActions {
    @SelectOptionsAction("options", "options")
    async onSettingsChanges(@Values() selectedValues: string[]) {
        console.log("selected values", selectedValues);
        return "settings changed";
    }
}

@Actions()
export class OverflowActions {
    @OverflowAction("overflow", "overflow-options")
    async onOverflowOptionSelection() {
        return "overflow menu option selected";
    }
}

@Actions()
export class DateActions {
    @DatepickerAction("date", "dates")
    async onDateSelection(@Value() date: string) {
        console.log("selected date", date);
        return "date selected";
    }
}

@Actions()
export class ActionsByValue {
    @ActionByValue("value")
    async onAction() {
        return "action by value";
    }
}

(async () => {
    const response = await handlePayload<{ name: string }>({
        type: "block_actions",
        team: {
            id: "T0CAG",
            domain: "acme-creamery"
        },
        user: {
            id: "U0CA5",
            username: "Amit Sharma",
            name: "Amit Sharma",
            team_id: "T3MDE"
        },
        api_app_id: "api_app_id______9829374987238947892374872893423",
        token: "i'm the token",
        container: {
            type: "message",
            text:
                "The contents of the original message where the action originated"
        },
        trigger_id: "12466734323.1395872398",
        response_url: "https://www.postresponsestome.com/T123567/1509734234",
        actions: [
            {
                type: "datepicker",
                block_id: "kjbsd",
                action_id: "date",
                selected_date: "1990-04-28",
                initial_date: "1990-04-28",
                action_ts: "1585668439.432531"
            }
        ]
    });

    if (response === "Unhandled Action") {
        // re-route to another action
        console.log(response);
    } else {
        console.log("response", response);
    }
})();
