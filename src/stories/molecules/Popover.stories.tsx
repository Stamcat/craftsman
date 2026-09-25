import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import { Button } from "../../components/Button/Button";
import { Popover } from "../../components/Popover/Popover";

const meta: Meta<typeof Popover> = {
    title: "Molecules/Popover",
    component: Popover,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component:
                    "Popover anchors richer, interactive floating content to any element using floating-ui — the same positioning engine as Tooltip. Use Tooltip for short hover hints; use Popover for click-opened, interactive content (forms, menus, multi-line explanations).",
            },
        },
    },
    args: {
        anchor: <Button variant="default">Open popover</Button>,
        content: "This is popover content",
        placement: "bottom-start",
        trigger: "click",
    },
    argTypes: {
        placement: {
            control: "select",
            options: ["top", "top-start", "top-end", "bottom", "bottom-start", "bottom-end", "left", "right"],
        },
        trigger: {
            control: "select",
            options: ["click", "hover"],
        },
        anchor: { control: false },
        open: { control: false },
        onOpenChange: { control: false },
    },
};

export default meta;
type Story = StoryObj<typeof Popover>;

export const Default: Story = {};

export const HoverToOpen: Story = {
    args: {
        anchor: <Button variant="text">Hover me</Button>,
        content: "Revealed on hover",
        trigger: "hover",
    },
};

export const RichContent: Story = {
    args: {
        anchor: <Button variant="primary">More info</Button>,
        content: (
            <div style={{ padding: "0.5rem", maxWidth: "220px" }}>
                <strong>Rich popover</strong>
                <p style={{ margin: "0.25rem 0 0" }}>Popover content can be any interactive React node.</p>
            </div>
        ),
        placement: "bottom-start",
    },
};

function ControlledDemo() {
    const [open, setOpen] = useState(false);
    return (
        <Popover
            anchor={<Button variant="default">{open ? "Close" : "Open"} settings</Button>}
            content={
                <div style={{ padding: "0.5rem" }}>
                    <p style={{ margin: "0 0 0.5rem" }}>Controlled by parent state.</p>
                    <Button variant="primary" onClick={() => setOpen(false)}>Save &amp; close</Button>
                </div>
            }
            open={open}
            onOpenChange={setOpen}
        />
    );
}

export const Controlled: Story = {
    render: () => <ControlledDemo />,
};

export const Placements: Story = {
    render: () => (
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", padding: "3rem" }}>
            {(["top", "bottom", "left", "right"] as const).map((p) => (
                <Popover key={p} anchor={<Button variant="default">{p}</Button>} content={`Placement: ${p}`} placement={p} />
            ))}
        </div>
    ),
};
