import type { Meta, StoryObj } from "@storybook/react-vite";
import { Skeleton } from "../../components/Skeleton/Skeleton";

const meta: Meta<typeof Skeleton> = {
    title: "Atoms/Skeleton",
    component: Skeleton,
    tags: ["autodocs"],
    parameters: {
        layout: "centered",
    },
    argTypes: {
        variant: {
            control: "select",
            options: ["text", "circle", "rect"],
        },
        duration: {
            control: "number",
        },
    },
    args: {
        variant: "rect",
        width: 200,
        height: 100,
    },
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Basic: Story = {};

export const Text: Story = {
    args: {
        variant: "text",
        width: 240,
        height: undefined,
    },
};

export const Circle: Story = {
    args: {
        variant: "circle",
        width: 56,
        height: 56,
    },
};

export const CustomDuration: Story = {
    args: {
        variant: "rect",
        width: 200,
        height: 100,
        duration: 3,
    },
};

export const CardPlaceholder: Story = {
    render: () => (
        <div style={{ display: "flex", flexDirection: "column", gap: 12, width: 240 }}>
            <Skeleton variant="circle" width={48} height={48} />
            <Skeleton variant="text" width="80%" />
            <Skeleton variant="text" width="60%" />
            <Skeleton variant="rect" width="100%" height={120} />
        </div>
    ),
};
