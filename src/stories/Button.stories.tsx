import type { Meta, StoryObj } from "@storybook/react-vite";
import { css } from "@emotion/react";
import { Button } from "../components/Button";
import { ButtonType } from "../styles/global/components/button";

const meta: Meta<typeof Button> = {
    title: "Components/Button",
    component: Button,
    tags: ["autodocs"],
    args: {
        children: "Click me",
        variant: "default",
        type: "button",
    },
    argTypes: {
        variant: {
            control: "select",
            options: ButtonType.options,
            description: "Call-to-action style variant",
        },
        type: {
            control: "select",
            options: ["button", "submit", "reset"]
        },
        styles: {
            control: false,
            description: "Optional Emotion SerializedStyles override",
        },
    },
    parameters: {
        layout: "centered",
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Primary: Story = {
    args: {
        children: "Primary",
        variant: "primary",
    },
};

export const Text: Story = {
    args: {
        children: "Text",
        variant: "text",
    },
};

export const Disabled: Story = {
    args: {
        children: "Disabled",
        disabled: true,
    },
};

export const AsSubmit: Story = {
    args: {
        children: "Save",
        type: "submit",
        "aria-label": "Save form",
    },
};

export const WithClassName: Story = {
    args: {
        children: "Class + Variant",
        variant: "primary",
        className: "custom-cta",
    },
};

export const WithEmotionStyles: Story = {
    args: {
        children: "Custom Emotion Style",
        variant: "default",
        styles: css`
            border: 1px dashed var(--purple500);
            background: var(--purple50);
            color: var(--purple900);
            &:hover {
                background: var(--purple100);
            }
        `,
    },
};
