export interface MessagePayload {
    type: string;
    team: Team;
    user: User;
    api_app_id: string;
    token: string;
    container: Container;
    trigger_id: string;
    response_url: string;
    actions: any[];
}

export interface Action {
    type: string;
    block_id: string;
    action_id: string;
    selected_option: SelectedOption;
    placeholder: Placeholder;
    action_ts: string;
}

export interface Placeholder {
    type: string;
    text: string;
    emoji: boolean;
}

export interface SelectedOption {
    text: Placeholder;
    value: string;
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
