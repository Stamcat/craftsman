import type { Meta, StoryObj } from "@storybook/react";
import { Label } from "../../components/Label";
import { Text } from "../../components/Text";
import { css } from "styled-components";
import { color } from "../../utilities/colors";
import React from "react";

const LabelExample: React.FC = (props) => {
    return (
        <>
            <Label {...props} />
            <input />
        </>
    );
};

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Label> = {
    title: "Atoms/Label",
    component: LabelExample,
    tags: ["autodocs"],
    args: {
        children: "Label for input",
        $labelPosition: "left",
        $labelStyles: css`
            color: ${color("garden")};
        `,
    },
    argTypes: {
        $labelPosition: {
            control: {
                type: "select",
            },
            options: ["top", "bottom", "left", "right"],
        },
    },
};

export default meta;
type Story = StoryObj<typeof Label>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {};
export const Custom: Story = {
    args: {
        children: <Text $type="h4">Custom Text for label element</Text>,
    },
    parameters: {
        docs: {
            description: {
                story: "You can pass in a string or an entire component as the label's children",
            },
        },
    },
};
