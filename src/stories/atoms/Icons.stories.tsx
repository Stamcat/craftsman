import type { Meta, StoryObj } from "@storybook/react";
import { IconCircleArrowRight } from "../../icons/IconCircleArrowRight";
import { color } from "../../utilities/colors";

const meta: Meta<typeof IconCircleArrowRight> = {
    title: "Atoms/Icons",
    tags: ["autodocs"],
    component: IconCircleArrowRight,
    args: {
        height: 30,
        width: 30,
        fill: color("garden"),
    },
    argTypes: {
        fill: {
            control: {
                type: "color",
            },
        },
    },
    parameters: {
        docs: {
            description: {
                component:
                    "All of our icons are stored as React components with nested SVG objects. This allows us to poperly tree-shake our assets so that your production bundle only contains what it uses, and nothing else.",
            },
        },
    },
};

export default meta;
type Story = StoryObj<typeof IconCircleArrowRight>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
    parameters: {
        docs: {
            description: {
                story: "Color & size are customizable, but default to 24px wide and standard black color",
            },
        },
    },
    args: {},
};
export const Customized: Story = {
    parameters: {
        docs: {
            description: {
                story: "We can import any file we want, they all take the same props.",
            },
        },
    },
    args: {
        height: 50,
        width: 50,
        fill: `${color("red")}`,
        viewBox: "0 0 25 25",
    },
};
