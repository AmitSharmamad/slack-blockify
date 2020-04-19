import { expect } from "chai";
import { User, Team } from "slack-blockify-types";
import { clearStore, register, handlePayload } from "../../core";
import {
    UserInfo,
    TeamInfo,
    Actions,
    ButtonAction,
    Value,
    SelectOptionsAction,
    ActionsInfo,
    Values,
    ContainerInfo,
    TriggerId,
    ResponseUrl,
    ApiAppId,
    PayloadInfo,
} from "../../decorators";
import {
    getInteractiveMessagePayloadWithActions,
    team,
    user,
    container,
    response_url,
    trigger_id,
    api_app_id,
} from "../utils/slack-payload";

describe("should return the respective injected values", () => {
    beforeEach(() => {
        clearStore();
    });

    it("should inject correct user info", async () => {
        @Actions()
        class LaskuTapa {
            @ButtonAction("action1")
            async userInfoCheck(@UserInfo() user: User) {
                return user;
            }
        }
        register([LaskuTapa]);
        const payload = getInteractiveMessagePayloadWithActions([
            {
                type: "button",
                block_id: "ding-chaka",
                action_id: "action1",
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
        expect(result).equals(user);
    });

    it("should inject correct team info", async () => {
        @Actions()
        class LaskuTapa {
            @ButtonAction("action1", "block1")
            async teamInfoCheck(@TeamInfo() team: Team) {
                return team;
            }
        }
        register([LaskuTapa]);
        const payload = getInteractiveMessagePayloadWithActions([
            {
                type: "button",
                block_id: "ding-chaka",
                action_id: "action1",
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
        expect(result).equals(team);
    });

    it("should inject correct value info", async () => {
        @Actions()
        class LaskuTapa {
            @ButtonAction("action1", "block1")
            async valueCheck(@Value() value: string) {
                return value;
            }
        }
        register([LaskuTapa]);
        const payload = getInteractiveMessagePayloadWithActions([
            {
                type: "button",
                block_id: "ding-chaka",
                action_id: "action1",
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
        expect(result).equals("lasku-tapa");
    });

    it("should inject correct values info", async () => {
        @Actions()
        class LaskuTapa {
            @SelectOptionsAction("action1", "block1")
            async valuesCheck(@Values() values: string[]) {
                return values;
            }
        }
        register([LaskuTapa]);
        const payload = getInteractiveMessagePayloadWithActions([
            {
                type: "multi_static_select",
                block_id: "block1",
                action_id: "action1",
                selected_options: [
                    {
                        text: {
                            type: "plain_text",
                            text: "Choice 1",
                            emoji: true,
                        },
                        value: "value0",
                    },
                ],
                placeholder: {
                    type: "plain_text",
                    text: "Select items",
                    emoji: true,
                },
                action_ts: "action_ts",
            },
        ]);

        const result: any = await handlePayload(payload);
        expect(result instanceof Array).true;
        result.includes("value0");
    });

    it("should inject correct actions info", async () => {
        @Actions()
        class LaskuTapa {
            @ButtonAction("action1", "block1")
            async actionInfoCheck(@ActionsInfo() actions: any[]) {
                return actions;
            }
        }
        register([LaskuTapa]);
        const actions = [
            {
                type: "button",
                block_id: "block1",
                action_id: "action1",
                text: {
                    type: "plain_text",
                    text: "Button 1",
                    emoji: true,
                },
                value: "lasku-tapa",
                action_ts: "action_ts",
            },
        ];
        const payload = getInteractiveMessagePayloadWithActions(actions);

        const result = await handlePayload(payload);
        expect(result).equals(actions);
    });

    it("should inject correct container info", async () => {
        @Actions()
        class LaskuTapa {
            @ButtonAction("action1", "block1")
            async containerCheck(@ContainerInfo() containerInfo: any) {
                return containerInfo;
            }
        }
        register([LaskuTapa]);
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
                value: "lasku-tapa",
                action_ts: "action_ts",
            },
        ]);

        const result = await handlePayload(payload);
        expect(result).equals(container);
    });

    it("should inject correct trigger info", async () => {
        @Actions()
        class LaskuTapa {
            @ButtonAction("action1", "block1")
            async triggerCheck(@TriggerId() triggerId: string) {
                return triggerId;
            }
        }
        register([LaskuTapa]);
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
                value: "lasku-tapa",
                action_ts: "action_ts",
            },
        ]);

        const result = await handlePayload(payload);
        expect(result).equals(trigger_id);
    });

    it("should inject correct response url", async () => {
        @Actions()
        class LaskuTapa {
            @ButtonAction("action1", "block1")
            async responseUrlCheck(@ResponseUrl() responseUrl: string) {
                return responseUrl;
            }
        }
        register([LaskuTapa]);
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
                value: "lasku-tapa",
                action_ts: "action_ts",
            },
        ]);

        const result = await handlePayload(payload);
        expect(result).equals(response_url);
    });

    it("should inject correct api app id", async () => {
        @Actions()
        class LaskuTapa {
            @ButtonAction("action1", "block1")
            async apiAppIdCheck(@ApiAppId() apiAppId: string) {
                return apiAppId;
            }
        }
        register([LaskuTapa]);
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
                value: "lasku-tapa",
                action_ts: "action_ts",
            },
        ]);

        const result = await handlePayload(payload);
        expect(result).equals(api_app_id);
    });

    it("should inject correct payload info", async () => {
        @Actions()
        class LaskuTapa {
            @ButtonAction("action1", "block1")
            async payloadInfoCheck(@PayloadInfo() payload: any) {
                return payload;
            }
        }
        register([LaskuTapa]);
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
                value: "lasku-tapa",
                action_ts: "action_ts",
            },
        ]);

        const result = await handlePayload(payload);
        expect(result).equals(payload);
    });
});
