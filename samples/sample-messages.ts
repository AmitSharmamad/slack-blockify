import {
    Actions,
    ButtonAction,
    SelectOptionAction,
    SelectOptionsAction,
    UserInfo,
    TeamInfo,
    Value,
    Values,
    OverflowAction,
    DatepickerAction
} from "../decorators";
import { User, Team } from "../types/payloads";

const sendMessage = async (message: any) => {
    message;
    // const slackResponse = await request.post(
    //     "https://slack.com/api/chat.postMessage",
    //     {
    //         headers: {
    //             "Content-type": "application/json",
    //             Authorization: "Bearer <OAuth Access Token>"
    //         },
    //         body: JSON.stringify({
    //             channel: "<Bot Channel Id>",
    //             ...message
    //         })
    //     }
    // );
    // console.log("slack response", slackResponse);
};

export const sendButtonMessage = () => {
    sendMessage({
        text: "Hello there!!!",
        blocks: [
            {
                type: "section",
                block_id: "approvals",
                text: {
                    type: "mrkdwn",
                    text: "This is a section block with a button."
                },
                accessory: {
                    type: "button",
                    text: {
                        type: "plain_text",
                        text: "Click Me"
                    },
                    value: "value",
                    action_id: "approved"
                }
            }
        ]
    });
};

@Actions()
export class ApprovalActions {
    @ButtonAction("approved", "approvals")
    async onApproval(
        @UserInfo() user: User,
        @TeamInfo() team: Team,
        @Value() value: string
    ) {
        console.log(user.name, "from", team.domain, value, "the loan");
        return "approved";
    }
}

export const sendSelectMessage = () => {
    sendMessage({
        text: "",
        blocks: [
            {
                type: "section",
                block_id: "roles",
                text: {
                    type: "mrkdwn",
                    text: "Select a role..."
                },
                accessory: {
                    type: "static_select",
                    action_id: "role",
                    placeholder: {
                        type: "plain_text",
                        text: "Select an item",
                        emoji: true
                    },
                    options: [
                        {
                            text: {
                                type: "plain_text",
                                text: "Antagonist",
                                emoji: true
                            },
                            value: "antagonist"
                        },
                        {
                            text: {
                                type: "plain_text",
                                text: "Protagonist",
                                emoji: true
                            },
                            value: "protagonist"
                        }
                    ]
                }
            }
        ]
    });
};

@Actions()
export class RoleSelectionActions {
    @SelectOptionAction("role", "roles")
    async onRoleSelection(@Value() selectedRoleValue: string) {
        console.log("The selected Role is", selectedRoleValue);
        return "role selected";
    }
}

export const sendMultiSelectMessage = () => {
    sendMessage({
        text: "",
        blocks: [
            {
                type: "section",
                block_id: "ice-creams",
                text: {
                    type: "mrkdwn",
                    text: "Select your favorite ice-creams"
                },
                accessory: {
                    type: "multi_static_select",
                    action_id: "ice-cream",
                    placeholder: {
                        type: "plain_text",
                        text: "Select ice-creams",
                        emoji: true
                    },
                    options: [
                        {
                            text: {
                                type: "plain_text",
                                text: "Vanilla",
                                emoji: true
                            },
                            value: "vanilla"
                        },
                        {
                            text: {
                                type: "plain_text",
                                text: "Chocolate",
                                emoji: true
                            },
                            value: "chocolate"
                        },
                        {
                            text: {
                                type: "plain_text",
                                text: "Strawberry",
                                emoji: true
                            },
                            value: "strawberry"
                        },
                        {
                            text: {
                                type: "plain_text",
                                text: "Pista",
                                emoji: true
                            },
                            value: "pista"
                        }
                    ]
                }
            }
        ]
    });
};

@Actions()
export class IceCreamActions {
    @SelectOptionsAction("ice-cream", "ice-creams")
    async onIceCreamFlavorsSelection(@Values() iceCreamFlavors: string[]) {
        console.log("Favorite ice-cream flavors are", iceCreamFlavors);
        return "ice-cream flavors selected";
    }
}

export const sendOverflowMessage = () => {
    sendMessage({
        text: "",
        blocks: [
            {
                type: "section",
                block_id: "document-actions",
                text: {
                    type: "mrkdwn",
                    text: "Choose an option..."
                },
                accessory: {
                    type: "overflow",
                    action_id: "document-action",
                    options: [
                        {
                            text: {
                                type: "plain_text",
                                text: "Edit",
                                emoji: true
                            },
                            value: "edit"
                        },
                        {
                            text: {
                                type: "plain_text",
                                text: "Forward",
                                emoji: true
                            },
                            value: "forward"
                        },
                        {
                            text: {
                                type: "plain_text",
                                text: "Delete",
                                emoji: true
                            },
                            value: "delete"
                        }
                    ]
                }
            }
        ]
    });
};

@Actions()
export class DocumentActions {
    @OverflowAction("document-action", "document-actions")
    async onActionSelection(@Value() selectedOption: string) {
        console.log(selectedOption, "option is chosen on the document");
        return "document option selected";
    }
}

export const sendDatepickerMessage = () => {
    sendMessage({
        text: "",
        blocks: [
            {
                type: "actions",
                block_id: "journey-dates",
                elements: [
                    {
                        type: "datepicker",
                        action_id: "starting-date",
                        initial_date: "1990-04-28",
                        placeholder: {
                            type: "plain_text",
                            text: "Select a date",
                            emoji: true
                        }
                    },
                    {
                        type: "datepicker",
                        action_id: "ending-date",
                        initial_date: "1990-04-28",
                        placeholder: {
                            type: "plain_text",
                            text: "Select a date",
                            emoji: true
                        }
                    }
                ]
            }
        ]
    });
};

@Actions()
export class JourneyDateActions {
    @DatepickerAction("starting-date", "journey-dates")
    async onStartingDateSelection(@Value() startingDate: string) {
        console.log("starting date is set to", startingDate);
        return "starting date selected";
    }
    @DatepickerAction("ending-date", "journey-dates")
    async onEndingDateSelection(@Value() endingDate: string) {
        console.log("ending date is set to", endingDate);
        return "ending date selected";
    }
}

// Uncomment the messages, if not required to be sent to your workspace
sendButtonMessage();
sendSelectMessage();
sendMultiSelectMessage();
sendOverflowMessage();
sendDatepickerMessage();
