import type { Meta, StoryObj } from "@storybook/react";
import { Loader } from "../../components/Loader";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Loader> = {
    title: "Atoms/Loader",
    component: Loader,
    tags: ["autodocs"],
    args: {},
    argTypes: {},
    parameters: {
        docs: {
            description: {
                component: "This is incomplete. Needs to be re-done",
            },
        },
    },
};

export default meta;
type Story = StoryObj<typeof Loader>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {};
