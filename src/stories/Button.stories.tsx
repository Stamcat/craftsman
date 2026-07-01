import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "../components/Button";

const meta: Meta<typeof Button> = {
    title: "Components/Button",
    component: Button,
    tags: ["autodocs"],
    args: {
        children: "Click me",
    },
    parameters: {
        layout: "centered",
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Disabled: Story = {
    args: {
        children: "Disabled",
        disabled: true,
    },
};

export const AsSubmit: Story = {
    args: {
        children: "Save",
        type: "submit",
        "aria-label": "Save form",
    },
};
