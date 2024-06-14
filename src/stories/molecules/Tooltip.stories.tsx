import type { Meta, StoryObj } from "@storybook/react";
import { Tooltip } from "../../components/Tooltip";
import React from "react";
import { Button } from "../../components/Button";

const meta: Meta<typeof Tooltip> = {
    title: "Molecules/Tooltip",
    component: Tooltip,
    tags: ["autodocs"],
    args: {
        children: <>Test</>,
        visible: true,
        trigger: <Button $type="text" $label="Test Test" />,
    },
    parameters: {
        docs: {
            story: {
                inline: false,
                iframeHeight: 300,
            },
        },
    },
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
    args: {
        visible: false,
    },
};
