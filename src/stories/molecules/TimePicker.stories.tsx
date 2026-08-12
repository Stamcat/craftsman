import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import { TimePicker } from "../../components/TimePicker/TimePicker";

// defined at module level to avoid remount on every render
const ControlledDemo = (args: React.ComponentProps<typeof TimePicker>) => {
    const [time, setTime] = useState("11:00");
    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
            <TimePicker {...args} value={time} onChange={(e) => setTime(e.target.value)} />
            <code>{time}</code>
        </div>
    );
};

const meta: Meta<typeof TimePicker> = {
    title: "Molecules/TimePicker",
    component: TimePicker,
    tags: ["autodocs"],
    args: {
        label: "Time",
        labelPosition: "top",
    },
    argTypes: {
        format: {
            control: "select",
            options: [12, 24],
        },
        locale: {
            control: "select",
            options: [
                "en-US",
                "es-MX",
                "de-DE",
                "ja-JP",
                "zh-CN",
                "ak-GH",
                "tr-TR",
                "fil-PH",
            ]
        },
        labelPosition: {
            control: "select",
            options: ["top", "left", "bottom", "right", "inside", "hidden"],
        },
        error: {
            control: "text",
        },
        required: {
            control: "boolean",
        },
        value: {
            control: "text",
        },
        defaultValue: {
            control: "text",
        },
    },
    parameters: {
        docs: {
            story: {
                inline: false,
                iframeHeight: 400,
            },
        },
    },
    decorators: [
        (Story) => (
            <div style={{ display: "flex", justifyContent: "center", padding: "2rem" }}>
                <Story />
            </div>
        ),
    ],
};

export default meta;
type Story = StoryObj<typeof TimePicker>;

export const Uncontrolled: Story = {
    args: { defaultValue: "09:30" },
};

export const Controlled: Story = {
    render: (args) => <ControlledDemo {...args} />,
};

// value with no onChange — wheels and inputs are non-interactive
export const ReadOnly: Story = {
    args: { value: "14:45" },
};

// no value or defaultValue — displays -- placeholder
export const NoValue: Story = {
    args: {},
};

export const Format24: Story = {
    args: { defaultValue: "14:30", format: 24 },
};

export const International: Story = {
    args: { defaultValue: "09:00", locale: "de-DE", label: "Uhrzeit" },
};

export const WithError: Story = {
    args: { error: "A time is required", required: true },
};

export const SideBySide: Story = {
    render: () => (
        <div style={{ display: "flex", alignItems: "flex-start", gap: "2rem" }}>
            <div>
                <label htmlFor="native-time" style={{ display: "block", marginBottom: "4px" }}>Native input</label>
                <input id="native-time" type="time" defaultValue="09:00" />
            </div>
            <TimePicker label="TimePicker" defaultValue="09:00" />
        </div>
    ),
};
