import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { DateTimePicker, type DateTimePickerProps } from "../../components/DateTimePicker/DateTimePicker";
import { zLabelPosition } from "../../utilities/types";

const formatDateTimeValue = (value: DateTimePickerProps["value"]): string => {
    if (!(value instanceof Date)) {
        return "No value selected";
    }
    return value.toLocaleString();
};

const DateTimeValuePreview = ({ value }: { value: DateTimePickerProps["value"] }) => (
    <div style={{ marginTop: "10px", fontSize: "14px" }}>
        Current value: {formatDateTimeValue(value)}
    </div>
);

const meta: Meta<typeof DateTimePicker> = {
    title: "Molecules/DateTimePicker",
    component: DateTimePicker,
    tags: ["autodocs"],
    decorators: [
        (Story) => <div style={{ minHeight: "400px" }}><Story /></div>,
    ],
    parameters: {
        layout: "padded",
    },
    args: {
        label: "Date & Time",
        labelPosition: "top",
        required: false,
    },
    argTypes: {
        label: { control: "text" },
        labelPosition: {
            control: "select",
            options: zLabelPosition.options,
        },
        required: { control: "boolean" },
        error: { control: "text" },
        value: { control: false },
        onChange: { control: false },
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

const DefaultStory = (args: React.ComponentProps<typeof DateTimePicker>) => {
    const [value, setValue] = useState<DateTimePickerProps["value"]>(null);
    return (
        <>
            <DateTimePicker {...args} value={value} onChange={setValue} />
            <DateTimeValuePreview value={value} />
        </>
    );
};

export const Default: Story = {
    render: (args) => <DefaultStory {...args} />,
};

const WithValueStory = (args: React.ComponentProps<typeof DateTimePicker>) => {
    const [value, setValue] = useState<DateTimePickerProps["value"]>(new Date("2026-01-15T09:30:00"));
    return (
        <>
            <DateTimePicker {...args} label="Appointment" value={value} onChange={setValue} />
            <DateTimeValuePreview value={value} />
        </>
    );
};

export const WithValue: Story = {
    render: (args) => <WithValueStory {...args} />,
};

const RequiredStory = (args: React.ComponentProps<typeof DateTimePicker>) => {
    const [value, setValue] = useState<DateTimePickerProps["value"]>(null);
    return (
        <>
            <DateTimePicker {...args} label="Meeting Time" required value={value} onChange={setValue} />
            <DateTimeValuePreview value={value} />
        </>
    );
};

export const Required: Story = {
    render: (args) => <RequiredStory {...args} />,
};

const WithErrorStory = (args: React.ComponentProps<typeof DateTimePicker>) => {
    const [value, setValue] = useState<DateTimePickerProps["value"]>(null);
    return (
        <>
            <DateTimePicker {...args} label="Scheduled At" error="Please select a valid date and time." value={value} onChange={setValue} />
            <DateTimeValuePreview value={value} />
        </>
    );
};

export const WithError: Story = {
    render: (args) => <WithErrorStory {...args} />,
};

export const Disabled: Story = {
    render: (args) => <DateTimePicker {...args} label="Locked Date" value={new Date("2026-06-01T14:00:00")} onChange={() => {}} disabled />,
};
