import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { Button } from "../../components/Button/Button";
import { Tooltip } from "../../components/Tooltip/Tooltip";

const meta: Meta<typeof Tooltip> = {
    title: "Molecules/Tooltip",
    component: Tooltip,
    tags: ["autodocs"],
    args: {
        anchor: <Button variant="default">Hover me</Button>,
        content: "This is a tooltip",
        placement: "bottom-start",
        showContent: "hover",
    },
    argTypes: {
        placement: {
            control: "select",
            options: ["top", "top-start", "top-end", "bottom", "bottom-start", "bottom-end", "left", "right"],
        },
        showContent: {
            control: "select",
            options: ["hover", "click"],
        },
        anchor: { control: false },
    },
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {};

export const ClickToShow: Story = {
    args: {
        anchor: <Button variant="primary">Click me</Button>,
        content: "Revealed on click",
        showContent: "click",
    },
};

export const RichContent: Story = {
    args: {
        anchor: <Button variant="text">What is this?</Button>,
        content: (
            <div style={{ padding: "0.5rem", maxWidth: "200px" }}>
                <strong>Rich tooltip</strong>
                <p style={{ margin: "0.25rem 0 0" }}>Tooltip content can be any React node.</p>
            </div>
        ),
        placement: "bottom-start",
    },
};

export const Placements: Story = {
    render: () => (
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", padding: "3rem" }}>
            {(["top", "bottom", "left", "right"] as const).map((p) => (
                <Tooltip key={p} anchor={<Button variant="default">{p}</Button>} content={`Placement: ${p}`} placement={p} />
            ))}
        </div>
    ),
};
