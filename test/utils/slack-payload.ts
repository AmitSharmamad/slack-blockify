import { InteractiveMessagePayload } from "slack-blockify-types";

export const user = {
    id: "user_id",
    username: "amitsharmamad",
    name: "Amit Madgula",
    team_id: "team_id",
};

export const team = {
    id: "team_id",
    domain: "team_domain",
};

export const container = {
    type: "container_type",
    text: "Container Text Message",
};

export const type = "block_actions";
export const api_app_id = "api_app_id";
export const token = "token";
export const trigger_id = "trigger_id";
export const response_url =
    "https://www.postresponsestome.com/T123567/1509734234";

export const getInteractiveMessagePayloadWithActions = (
    actions: any[]
): InteractiveMessagePayload => {
    return {
        type,
        user,
        api_app_id,
        token,
        container,
        trigger_id,
        team,
        response_url,
        actions: actions || [],
    };
};
