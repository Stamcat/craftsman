import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { DatePicker } from "../../components/Input/DatePicker";
import type { DatePickerProps } from "react-date-picker";
import { width } from "../../styles/utilities/layout";
import { zLabelPosition } from "../../utilities/types";

const meta: Meta<typeof DatePicker> = {
    title: "Atoms/Input/DatePicker",
    component: DatePicker,
    tags: ["autodocs"],
    decorators: [
        (Story) => <div style={{ minHeight: "400px" }}><Story /></div>,
    ],
    parameters: {
        layout: "padded",
        docs: {
            description: {
                component: "Date picker input powered by `react-date-picker`. Wraps `InputWrapper` so it supports all label positions, error states, and required marking.",
            },
        },
    },
    args: {
        id: "testDatePicker",
        label: "Date",
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

const DefaultStory = (args: React.ComponentProps<typeof DatePicker>) => {
    const [value, setValue] = useState<DatePickerProps["value"]>(null);
    return <DatePicker {...args} value={value} onChange={setValue} />;
};

export const Default: Story = {
    render: (args) => <DefaultStory {...args} />,
};

const RequiredStory = (args: React.ComponentProps<typeof DatePicker>) => {
    const [value, setValue] = useState<DatePickerProps["value"]>(null);
    return <DatePicker {...args} label="Date of Birth" required value={value} onChange={setValue} />;
};

export const Required: Story = {
    render: (args) => <RequiredStory {...args} />,
};

const WithErrorMessageStory = (args: React.ComponentProps<typeof DatePicker>) => {
    const [value, setValue] = useState<DatePickerProps["value"]>(null);
    return <DatePicker {...args} label="Appointment Date" error="Please select a valid date." value={value} onChange={setValue} />;
};

export const WithErrorMessage: Story = {
    render: (args) => <WithErrorMessageStory {...args} />,
};

const WithValueStory = (args: React.ComponentProps<typeof DatePicker>) => {
    const [value, setValue] = useState<DatePickerProps["value"]>(new Date("2026-01-15"));
    return <DatePicker {...args} label="Start Date" value={value} onChange={setValue} />;
};

export const WithValue: Story = {
    render: (args) => <WithValueStory {...args} />,
};

export const Disabled: Story = {
    args: {
        label: "Locked Date",
        value: new Date("2026-01-15"),
        disabled: true,
    },
};

const positionsGridStyle: React.CSSProperties = {
    display: "grid",
    gap: width("gutter"),
    maxWidth: width("column", 5),
};

export const LabelPositions: Story = {
    render: (args) => (
        <div style={positionsGridStyle}>
            <DatePicker {...args} label="Top" labelPosition="top" />
            <DatePicker {...args} label="Left" labelPosition="left" />
            <DatePicker {...args} label="Bottom" labelPosition="bottom" />
            <DatePicker {...args} label="Right" labelPosition="right" />
            <DatePicker {...args} label="Hidden label" labelPosition="hidden" />
        </div>
    ),
};

