import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { TimePicker } from "../../components/TimePicker/TimePicker";
import { Input } from "../../components/Input/Input";

const meta: Meta<typeof TimePicker> = {
    title: "Molecules/TimePicker",
    component: TimePicker,
    tags: ["autodocs"],
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
    args: { defaultValue: "09:30", label: "Start time" },
};

export const Controlled: Story = {
    render: (args) => {
        const ControlledDemo = () => {
            const [time, setTime] = useState("11:00");
            return (
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
                    <TimePicker {...args} value={time} onChange={(e) => setTime(e.target.value)} label="Start time" />
                    <code>{time}</code>
                </div>
            );
        };
        return <ControlledDemo />;
    },
};

// value with no onChange — wheels and inputs are non-interactive
export const ReadOnly: Story = {
    args: { value: "14:45", label: "Fixed time" },
};

// no value or defaultValue — displays -- placeholder
export const NoValue: Story = {
    args: { label: "Pick a time" },
};

export const Format24: Story = {
    args: { defaultValue: "14:30", format: 24, label: "Departure" },
};

export const International: Story = {
    args: { defaultValue: "09:00", locale: "de-DE", label: "Uhrzeit" },
};

export const WithError: Story = {
    args: { label: "Appointment time", error: "A time is required", required: true },
};

export const SideBySide: Story = {
    render: (args) => (
        <div style={{ display: "flex", alignItems: "flex-start", gap: "2rem" }}>
            <Input label="Start time" type="time" />
            <TimePicker {...args} label="Start time" defaultValue="09:00" />
        </div>
    ),
};
