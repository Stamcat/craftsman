import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Select } from "../../components/Select/Select";
import { zLabelPosition } from "../../utilities/types";
import { width } from "../../styles/utilities/layout";

const fruitOptions = [
    { value: "", label: "Select one..." },
    { value: "apple", label: "Apple" },
    { value: "banana", label: "Banana" },
    { value: "cherry", label: "Cherry" },
    { value: "mango", label: "Mango" },
    { value: "strawberry", label: "Strawberry" },
];

const meta: Meta<typeof Select> = {
    title: "Atoms/Select",
    component: Select,
    tags: ["autodocs"],
    parameters: {
        layout: "padded",
        docs: {
            description: {
                component: "Labeled select dropdown built on the native `<select>` element.",
            },
        },
    },
    args: {
        id: "select-demo",
        label: "Favorite Fruit",
        labelPosition: "top",
        required: false,
        options: fruitOptions,
    },
    argTypes: {
        label: { control: "text" },
        labelPosition: {
            control: "select",
            options: zLabelPosition.options,
        },
        required: { control: "boolean" },
        error: { control: "text" },
        options: { control: false },
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Required: Story = {
    args: {
        label: "Country",
        required: true,
        options: [
            { value: "", label: "Select a country..." },
            { value: "us", label: "United States" },
            { value: "ca", label: "Canada" },
            { value: "gb", label: "United Kingdom" },
        ],
    },
};

export const WithError: Story = {
    args: {
        label: "Favorite Fruit",
        error: "Please select an option.",
    },
};

const gridStyle: React.CSSProperties = {
    display: "grid",
    gap: width("gutter"),
    maxWidth: width("column", 5),
};

export const LabelPositions: Story = {
    render: (args) => (
        <div style={gridStyle}>
            <Select {...args} label="Top" labelPosition="top" />
            <Select {...args} label="Left" labelPosition="left" />
            <Select {...args} label="Bottom" labelPosition="bottom" />
            <Select {...args} label="Right" labelPosition="right" />
            <Select {...args} label="Inside" labelPosition="inside" />
        </div>
    ),
};

const ControlledSelect = (args: React.ComponentProps<typeof Select>) => {
    const [value, setValue] = useState("");
    return (
        <>
            <Select
                {...args}
                value={value}
                onChange={(e) => setValue(e.currentTarget.value)}
            />
            <small style={{ marginTop: "0.5rem", display: "block" }}>
                Selected: {value || "none"}
            </small>
        </>
    );
};

export const Controlled: Story = {
    render: (args) => <ControlledSelect {...args} />,
    parameters: {
        docs: {
            description: {
                story: "Controlled usage with value/onChange.",
            },
        },
    },
};
