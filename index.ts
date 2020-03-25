
export type TextType = 'plain_text' | 'mrkdwn';

export interface Element {
    type: TextType;
    text: string;
}

export interface AccessoryDefaults {
    action_id?: string;
}

export interface PlainTextAccessory {
    type: 'plain_text';
    text: string;
    emoji: boolean;
}

export interface TextAccessory extends AccessoryDefaults {
    type: TextType;
    text: string;
    emoji: boolean;
}

export interface ImageAccessory extends AccessoryDefaults {
    type: 'image';
    image_url: string;
    alt_text: string;
}

export interface ButtonAccessory extends AccessoryDefaults {
    type: 'button';
    text: TextAccessory;
    value: string;
}

export interface SelectOption {
    text: PlainTextAccessory;
    value: string;
}

export interface StaticSelectAccessory extends AccessoryDefaults {
    type: 'static_select';
    placeholder: PlainTextAccessory;
    options: SelectOption[];
    selected_option?: SelectOption;
}

export interface StaticMultiSelectAccessory extends AccessoryDefaults {
    type: 'multi_static_select';
    placeholder: PlainTextAccessory;
    options: SelectOption[];
    selected_options?: SelectOption[];
}

export interface OverflowAccessory extends AccessoryDefaults {
    type: 'overflow';
    options: SelectOption[];
}

export interface DatePickerAccessory extends AccessoryDefaults {
    type: 'datepicker';
    initial_date: string;
    placeholder: PlainTextAccessory;
}

export interface BlockDefaults {
    block_id?: string;
}

export interface Section extends BlockDefaults {
    type: 'section';
    text: Element;
    accessory: ImageAccessory | ButtonAccessory |
    StaticSelectAccessory | StaticMultiSelectAccessory |
    OverflowAccessory | DatePickerAccessory;
    fields: Element[];
}

export interface Image extends BlockDefaults {
    type: 'image';
    title: PlainTextAccessory;
    image_url: string;
    alt_text: string;
}

export interface Context extends BlockDefaults {
    type: 'context';
    elements: Element[];
}

export interface Divider extends BlockDefaults {
    type: 'divider';
}

export interface Actions extends BlockDefaults {
    type: 'actions';
    elements: Element[];
}

export type MessageBlock = Section | Image | Context | Divider | Actions;

export type ViewBlock = MessageBlock |
    RadioButtonsAccessory |
    CheckBoxesAccessory |
    Input;

export interface TextInput {
    type: 'plain_text_input';
    multiline: boolean;
}

export interface DatepickerInput {
    type: 'datepicker';
    initial_date: string;
    placeholder: PlainTextAccessory;
}

export interface SelectInput {
    type: 'static_select';
}

export interface Input {
    type: 'input';
    element: (
        TextInput | DatePickerAccessory | StaticSelectAccessory |
        StaticMultiSelectAccessory | CheckBoxesAccessory
    );
    label: PlainTextAccessory;
}

export interface InputOption {
    text: PlainTextAccessory;
    value: string;
    description: PlainTextAccessory;
}

export interface RadioButtonsAccessory extends AccessoryDefaults {
    type: 'radio_buttons';
    initial_option: InputOption;
    options: InputOption[];
}

export interface CheckBoxesAccessory extends AccessoryDefaults {
    type: 'checkboxes';
    options: InputOption[];
}

export interface BlockMessage {
    blocks: MessageBlock[];
}

export interface BlockView {
    type: 'modal';
    title: PlainTextAccessory;
    submit: PlainTextAccessory;
    close: PlainTextAccessory;
    blocks: ViewBlock[];
}

export type SlackMessage = BlockMessage | BlockView;