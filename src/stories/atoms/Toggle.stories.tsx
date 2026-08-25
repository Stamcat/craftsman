import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Toggle, type ToggleProps } from "../../components/Toggle/Toggle";

const ControlledToggle = (args: ToggleProps) => {
    const [checked, setChecked] = useState(false);
    return (
        <Toggle
            {...args}
            checked={checked}
            onChange={(e) => setChecked(e.currentTarget.checked)}
        />
    );
};

const meta: Meta<typeof Toggle> = {
    title: "Atoms/Input/Toggle",
	component: Toggle,
    tags: ["autodocs"],
	args: {
        label: "Accept terms",
        width: 40
	},
    argTypes: {
        width: { control: "number" },
        error: { control: "text" },
    },
};

export default meta;

type Story = StoryObj<typeof Toggle>;

export const Default: Story = {};

export const Controlled: Story = {
    render: (args) => <ControlledToggle {...args} />,
};

export const CustomWidth: Story = {
    args: {
        label: "Large toggle",
        width: 64,
    },
};

export const WithErrorMessage: Story = {
    args: {
        label: "Enable two-factor authentication",
        error: "This setting is required by your organization.",
    },
};

export const Disabled: Story = {
    args: {
        label: "Disabled toggle",
        disabled: true,
    },
};

