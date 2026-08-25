import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import { TimePicker } from "../../components/TimePicker/TimePicker";
import { Input } from "../../components/Input/Input";
import { DatePicker } from "../../components/DatePicker/DatePicker";

// defined at module level to avoid remount on every render
const ControlledDemo = (args: React.ComponentProps<typeof TimePicker>) => {
    const [time, setTime] = useState(typeof args.value === "string" ? args.value : "");
    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
            <TimePicker {...args} value={time} onChange={(v) => setTime(v ?? "")} />
            <code>{time || "(no value)"}</code>
        </div>
    );
};

const SideBySideDemo = () => {
    const [time, setTime] = useState("09:00");
    return (
        <div style={{ display: "flex", alignItems: "flex-start", gap: "2rem" }}>
            <div>
                <label htmlFor="native-time" style={{ display: "block", marginBottom: "4px" }}>Native input</label>
                <input id="native-time" type="time" value={time} onChange={(e) => setTime(e.target.value)} />
            </div>
            <Input type="time" label="Design System Time" value={time} onChange={(e) => setTime(e.target.value)} />
            <DatePicker label="DatePicker" />
            <TimePicker label="TimePicker" value={time} onChange={(v) => setTime(v ?? "")} />
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
    },
    parameters: {
        // height (not iframeHeight) applies to inline stories too, keeping theme propagation from the Docs page
        docs: {
            story: {
                height: "400px",
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
    args: { value: "09:30" },
    render: (args) => <ControlledDemo {...args} />,
};

export const Controlled: Story = {
    args: { value: "11:00" },
    render: (args) => <ControlledDemo {...args} />,
};

// value with no onChange — wheels and inputs are non-interactive
export const ReadOnly: Story = {
    args: {
        value: "14:45",
        disabled: true,
    },
};

// no value or defaultValue — displays -- placeholder
export const NoValue: Story = {
    args: {},
};

export const Format24: Story = {
    args: { value: "14:30", format: 24 },
    render: (args) => <ControlledDemo {...args} />,
};

export const International: Story = {
    args: { value: "09:00", locale: "de-DE", label: "Uhrzeit" },
    render: (args) => <ControlledDemo {...args} />,
};

export const WithError: Story = {
    args: { error: "A time is required", required: true },
};

export const SideBySide: Story = {
    render: () => <SideBySideDemo />,
};
