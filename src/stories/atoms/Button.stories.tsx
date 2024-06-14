import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../../components/Button";
import React from "react";
import { css } from "styled-components";
import { IconCircleArrowRight } from "../../icons/IconCircleArrowRight";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Button> = {
    title: "Atoms/Button",
    component: Button,
    tags: ["autodocs"],
    args: {
        $label: "Press Me",
        $type: "text",
        $icon: undefined,
        $styles: undefined,
        $size: undefined,
        className: undefined,
        disabled: false,
        onClick: () => alert("Button has been clicked"),
    },
    argTypes: {},
    parameters: {},
};

export default meta;
type Story = StoryObj<typeof Button>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
    // render: () => (<Button>Default Button</Button>),
    args: {},
    parameters: {},
};
export const Primary: Story = {
    args: {
        $type: "primary",
        $label: "Button",
    },
};
export const Secondary: Story = {
    args: {
        $type: "secondary",
        $label: "Secondary Button",
    },
};
export const Disabled: Story = {
    args: {
        disabled: true,
        className: "disabled",
        $type: "secondary",
        onClick: () => alert("This button was disabled for some reason"),
    },
    parameters: {
        docs: {
            description: {
                story: "Disabled state can be both a property AND a className. Using disabled as a property will block user interaction. Using disabled as a className allows us to maintain the look of a disabled state while not blocking the user interaction. This is useful when we want to do things like show a tooltip or modal explaining why the button was disabled.",
            },
        },
    },
};

export const WithSVGIcon: Story = {
    args: {
        $type: "primary",
        $label: "Button",
        $icon: <IconCircleArrowRight />,
    },
};
export const CustomStyles: Story = {
    parameters: {
        docs: {
            description: {
                story: "Please don't make it this ugly.",
            },
        },
    },
    args: {
        $label: "Custom Styled Button",
        $styles: css`
            background-color: purple;
            color: yellow;
        `,
    },
};
