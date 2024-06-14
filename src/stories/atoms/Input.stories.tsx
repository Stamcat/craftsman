import type { Meta, StoryObj } from "@storybook/react";
import { Input, TextInputProps } from "../../components/Input";
import { Text } from "../../components/Text";
import React from "react";
// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<TextInputProps> = {
    title: "Atoms/Input",
    component: Input,
    tags: ["autodocs"],
    args: {
        type: "text",
        disabled: false,
        readOnly: false,
        required: false,
        $label: "",
        $error: "",
    },
    argTypes: {
        type: {
            control: {
                type: "select",
            },
            options: [
                "button",
                "checkbox",
                "color",
                "date",
                "datetime-local",
                "email",
                "file",
                "hidden",
                "image",
                "month",
                "number",
                "password",
                "radio",
                "range",
                "reset",
                "search",
                "submit",
                "tel",
                "text",
                "time",
                "url",
                "week",
            ],
        },
        $label: {
            control: {
                type: "text",
            },
        },
        $error: {
            control: {
                type: "text",
            },
        },
    },
};

export default meta;
type Story = StoryObj<TextInputProps>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {};
export const TopLabel: Story = {
    args: {
        $labelPosition: "top",
        $label: "Input With Label (top)",
        required: true,
        $error: "",
    },
    parameters: {
        docs: {
            description: {
                story: "We provide handling of labels out of the box. Required fields with the $label property also automatically include * at the end of every label",
            },
        },
    },
};
export const LeftLabel: Story = {
    args: {
        $labelPosition: "left",
        $label: "Input With Label (left)",
    },
};
export const CustomLabel: Story = {
    args: {
        type: "radio",
        $labelPosition: "right",
        $label: (
            <Text $type="span">
                Label with <strong>custom</strong> HTML element
            </Text>
        ),
    },
};
export const WithError: Story = {
    args: {
        $labelPosition: "top",
        $label: "Input With Error",
        $error: "something went wrong",
    },
    parameters: {
        docs: {
            description: {
                story: "Error handling is done by the implementation code, however we provide some validations out of the box available for you to use",
            },
        },
    },
};
export const RadioButton: Story = {
    args: {
        type: "radio",
        $labelPosition: "right",
        $label: "Radio Button With Label (right)",
    },
    parameters: {
        docs: {
            description: {
                story: "Radio button input with label on the right",
            },
        },
    },
};
export const CheckBox: Story = {
    args: {
        type: "checkbox",
        $labelPosition: "right",
        $label: "Checkbox With Label (right)",
    },
    parameters: {
        docs: {
            description: {
                story: "Checkbox Input with label on the right",
            },
        },
    },
};
