import type { Meta, StoryObj } from "@storybook/react-vite";
import React, { useState } from "react";
import { SelectWheel } from "../../components/SelectWheel/SelectWheel";
import { zLabelPosition } from "../../utilities/types";

const poundOptions = Array.from({ length: 300 }, (_, i) => ({
    value: String(i + 1),
    label: String(i + 1),
}));

const usStates = [
    "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware",
    "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky",
    "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri",
    "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York",
    "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island",
    "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington",
    "West Virginia", "Wisconsin", "Wyoming",
];
const stateOptions = usStates.map((state) => ({ value: state, label: state }));

// defined at module level to avoid remount on every render
const ControlledDemo = (args: React.ComponentProps<typeof SelectWheel>) => {
    const [value, setValue] = useState(args.value ?? "");
    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
            <SelectWheel {...args} value={value} onChange={setValue} />
            <code>{value || "(no value)"}</code>
        </div>
    );
};

const meta: Meta<typeof SelectWheel> = {
    title: "Molecules/SelectWheel",
    component: SelectWheel,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component: "Functions like a dropdown, but presents its options as a scrollable wheel, matching the wheel used by `TimePicker`. Pair with `staticLabel` to show a trailing unit alongside the selected value, e.g. \"180 pounds\".",
            },
            story: {
                height: "400px",
            },
        },
    },
    args: {
        label: "Weight",
        labelPosition: "top",
        options: poundOptions,
        staticLabel: "pounds",
    },
    argTypes: {
        label: { control: "text" },
        labelPosition: {
            control: "select",
            options: zLabelPosition.options,
        },
        error: { control: "text" },
        required: { control: "boolean" },
        value: { control: "text" },
        staticLabel: { control: "text" },
        loop: { control: "boolean" },
        disabled: { control: "boolean" },
        width: { control: "text" },
        options: { control: false },
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
type Story = StoryObj<typeof SelectWheel>;

export const Uncontrolled: Story = {
    args: { value: "180" },
    render: (args) => <ControlledDemo {...args} />,
};

export const Controlled: Story = {
    args: { value: "140" },
    render: (args) => <ControlledDemo {...args} />,
};

// no value or defaultValue — field displays blank placeholder
export const NoValue: Story = {
    args: {},
};

export const NoStaticLabel: Story = {
    args: { value: "42", staticLabel: undefined, label: "Quantity" },
    render: (args) => <ControlledDemo {...args} />,
};

export const Loop: Story = {
    args: {
        label: "Hour",
        value: "1",
        loop: true,
        options: Array.from({ length: 24 }, (_, i) => ({ value: String(i), label: String(i) })),
        staticLabel: undefined,
    },
    render: (args) => <ControlledDemo {...args} />,
    parameters: {
        docs: {
            description: {
                story: "The `loop` prop wraps the wheel from the last option back to the first and vice versa.",
            },
        },
    },
};

export const Disabled: Story = {
    args: { value: "180", disabled: true },
};

export const WithError: Story = {
    args: { error: "A weight is required", required: true },
};

export const CustomWidth: Story = {
    args: { value: "180", width: "50%" },
    parameters: {
        docs: {
            description: {
                story: "The `width` prop accepts any CSS length (`\"50%\"`, `\"320px\"`) and sets it via the `--input-width` CSS variable.",
            },
        },
    },
    render: (args) => <ControlledDemo {...args} />,
};

export const UsStates: Story = {
    args: {
        label: "State",
        value: "California",
        options: stateOptions,
        staticLabel: undefined,
    },
    render: (args) => <ControlledDemo {...args} />,
};
