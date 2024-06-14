import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { Code } from "../../components/Code";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Code> = {
    title: "Atoms/Code",
    component: Code,
    tags: ["autodocs"],
    args: {
        children: "npm run lint:staged",
    },
    argTypes: {},
};

export default meta;
type Story = StoryObj<typeof Code>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {};
export const MultiLine: Story = {
    args: {
        children: (
            <>
                {`
If your code needs multiple lines,\n
you'll need to use '\\n'
            `}
            </>
        ),
    },
};
