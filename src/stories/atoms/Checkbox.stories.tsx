import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import styled from "@emotion/styled";
import { Checkbox } from "../../components/Checkbox";

const Stack = styled.div`
	display: grid;
	gap: 0.75rem;
`;

const optionItems = [
    { id: "notifications-email", value: "email", label: "Email notifications" },
    { id: "notifications-sms", value: "sms", label: "SMS notifications" },
    { id: "notifications-push", value: "push", label: "Push notifications" },
];

type CheckboxGroupProps = React.ComponentProps<typeof Checkbox>;

const ThreeOptionsGroup = (args: CheckboxGroupProps) => {
    const [selected, setSelected] = useState<string[]>(["email"]);

    const toggleValue = (value: string) => {
        setSelected((current) =>
            current.includes(value) ? current.filter((item) => item !== value) : [...current, value],
        );
    };

    return (
        <Stack>
            {optionItems.map((option) => (
                <Checkbox
                    {...args}
                    key={option.id}
                    id={option.id}
                    value={option.value}
                    label={option.label}
                    checked={selected.includes(option.value)}
                    onChange={() => toggleValue(option.value)}
                />
            ))}
            <small>Selected: {selected.join(", ") || "none"}</small>
        </Stack>
    );
};

const meta: Meta<typeof Checkbox> = {
    title: "Atoms/Checkbox",
	component: Checkbox,
    tags: ["autodocs"],
	args: {
        label: "Accept terms",
	},
};

export default meta;

type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {};

export const Checked: Story = {
	args: {
		checked: true,
	},
};

export const ThreeOptions: Story = {
    args: {
        name: "notification-preferences",
        labelPosition: "right",
    },
    render: (args) => <ThreeOptionsGroup {...args} />,
};

export const WithErrorMessage: Story = {
    args: {
        id: "accept-privacy-policy",
        name: "accept-privacy-policy",
        value: "accepted",
        label: "I agree to the privacy policy",
        error: "You must accept the privacy policy before continuing.",
        labelPosition: "right",
    },
};
