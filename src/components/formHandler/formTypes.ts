export type FormControlType = "click-button" | "checkbox" | "radio-button" | "slider" | "text-entry" | "drop-down" | "date-picker";

export interface FormControlConfig {
    index: number;
    type: FormControlType;
    label?: string;
    options?: string[]; // Used for radio buttons, dropdowns, etc.
    name?: string;
    value?: string;
}