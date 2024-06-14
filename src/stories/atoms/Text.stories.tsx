import type { Meta, StoryObj } from "@storybook/react";
import { Text } from "../../components/Text";
import React from "react";

const meta: Meta<typeof Text> = {
    title: "Atoms/Text",
    component: Text,
    tags: ["autodocs"],
    args: {
        $type: "h1",
        $bold: false,
        $italic: false,
        $error: false,
    },
    argTypes: {
        $type: {
            options: [
                "h1",
                "h2",
                "h3",
                "h4",
                "h5",
                "h6",
                "p",
                "span",
                "body",
                "bodyLarge",
                "bodyXLarge",
                "bodySmall",
                "caption",
            ],
        },
    },
};

export default meta;
type Story = StoryObj<typeof Text>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const TextComponent: Story = {
    args: {
        $type: "p",
        $error: false,
        children: "hello",
    },
    parameters: {
        docs: {
            description: {
                story: "This component is built to handle almost every common text tag used in a standard website.",
            },
        },
    },
};
export const CustomImplementations: Story = {
    args: {
        $type: "bodyXLarge",
        children: "hello",
    },
    parameters: {
        docs: {
            description: {
                story: "This component was also built to handle the custom typographic elements defined by Densu. For examle 'BodyXLarge' is not an HTML5 standard, so we created a component to handle it.",
            },
        },
    },
};

export const CompletelyOptional: Story = {
    render: (props) => <h4>{props.children}</h4>,
    args: {
        $type: undefined,
        children: "Hello",
    },
    parameters: {
        docs: {
            description: {
                story: "While this component will serve all (most) of your HTML5 tagging needs, it's not necessary. You can use standard HTML5 tags wherever applicable because those styles are globally defined.",
            },
        },
    },
};
