import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { DateRangePicker, type DateRangePickerProps } from "../../components/DateRangePicker/DateRangePicker";
import { width } from "../../styles/utilities/layout";
import { zLabelPosition } from "../../utilities/types";

const meta: Meta<typeof DateRangePicker> = {
    title: "Molecules/DateRagePicker",
    component: DateRangePicker,
    tags: ["autodocs"],
    decorators: [
        (Story) => <div style={{ minHeight: "400px" }}><Story /></div>,
    ],
    parameters: {
        layout: "padded",
    },
    args: {
        id: "testDateRangePicker",
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

const DefaultStory = (args: React.ComponentProps<typeof DateRangePicker>) => {
    const [value, setValue] = useState<DateRangePickerProps["value"]>(null);
    return <DateRangePicker {...args} value={value} onChange={setValue} />;
};

export const Default: Story = {
    render: (args) => <DefaultStory {...args} />,
};

const RequiredStory = (args: React.ComponentProps<typeof DateRangePicker>) => {
    const [value, setValue] = useState<DateRangePickerProps["value"]>(null);
    return <DateRangePicker {...args} label="Vacation Dates" required value={value} onChange={setValue} />;
};

export const Required: Story = {
    render: (args) => <RequiredStory {...args} />,
};

const WithErrorMessageStory = (args: React.ComponentProps<typeof DateRangePicker>) => {
    const [value, setValue] = useState<DateRangePickerProps["value"]>(null);
    return <DateRangePicker {...args} label="Booking Range" error="Please select a valid date range." value={value} onChange={setValue} />;
};

export const WithErrorMessage: Story = {
    render: (args) => <WithErrorMessageStory {...args} />,
};

const WithValueStory = (args: React.ComponentProps<typeof DateRangePicker>) => {
    const [value, setValue] = useState<DateRangePickerProps["value"]>([new Date("2026-01-15"), new Date("2026-01-22")]);
    return <DateRangePicker {...args} label="Stay Dates" value={value} onChange={setValue} />;
};

export const WithValue: Story = {
    render: (args) => <WithValueStory {...args} />,
};

export const Disabled: Story = {
    args: {
        label: "Locked Range",
        value: [new Date("2026-01-15"), new Date("2026-01-22")],
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
            <DateRangePicker {...args} label="Top" labelPosition="top" />
            <DateRangePicker {...args} label="Left" labelPosition="left" />
            <DateRangePicker {...args} label="Bottom" labelPosition="bottom" />
            <DateRangePicker {...args} label="Right" labelPosition="right" />
            <DateRangePicker {...args} label="Hidden label" labelPosition="hidden" />
        </div>
    ),
};
