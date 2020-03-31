export interface Payload {
    type: string;
    team: Team;
    user: User;
    api_app_id: string;
    token: string;
    container: Container;
    trigger_id: string;
    response_url: string;
    actions: Action[];
}

export interface Action {
    type: string;
    block_id: string;
    action_id: string;
    text: Text;
    value: string;
    action_ts: string;
}

export interface Text {
    type: string;
    text: string;
    emoji: boolean;
}

export interface Container {
    type: string;
    text: string;
}

export interface Team {
    id: string;
    domain: string;
}

export interface User {
    id: string;
    username: string;
    name: string;
    team_id: string;
}

export interface Options {}

export interface BlockActionOptions {
    actionId: string;
    blockId?: string;
}

export interface ValueOptions extends Options {
    value: string;
}
