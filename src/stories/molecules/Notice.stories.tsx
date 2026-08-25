import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Notice, type NoticeProps } from "../../components/Notice/Notice";
import { Button } from "../../components/Button/Button";
import { IoStar } from "react-icons/io5";

const meta: Meta<typeof Notice> = {
    title: "Molecules/Notice",
    component: Notice,
    tags: ["autodocs"],
    args: {
        type: "info",
        title: "Heads up",
        message: "This is an informational notice.",
    },
    argTypes: {
        type: {
            control: "select",
            options: ["help", "info", "success", "error", "none"],
        },
        dismissible: { control: "boolean" },
        icon: { control: false },
    },
};

export default meta;

type Story = StoryObj<typeof Notice>;

export const Default: Story = {};

export const Success: Story = {
    args: {
        type: "success",
        title: "Saved",
        message: "Your changes have been saved successfully.",
    },
};

export const Error: Story = {
    args: {
        type: "error",
        title: "Something went wrong",
        message: "Please check the highlighted fields and try again.",
    },
};

export const Help: Story = {
    args: {
        type: "help",
        title: "Need a hand?",
        message: "Visit our support center for more information.",
    },
};

export const NoIcon: Story = {
    args: {
        type: "none",
        title: "No status icon",
        message: "Useful for plain, unstyled announcements.",
    },
};

export const CustomIcon: Story = {
    args: {
        type: "success",
        title: "Featured",
        message: "Overrides the default status icon.",
        icon: <IoStar />,
    },
};

export const WithButtons: Story = {
    args: {
        type: "error",
        title: "Unable to save",
        message: "Would you like to retry?",
        buttons: (
            <>
                <Button variant="text">Dismiss</Button> | 
                <Button variant="text">Retry</Button>
            </>
        ),
    },
};

const DismissibleNotice = (args: NoticeProps) => {
    const [visible, setVisible] = useState(true);
    return (
        <Notice
            {...args}
            visible={visible}
            onDismiss={() => setVisible(false)}
        />
    );
};

export const Dismissible: Story = {
    render: (args) => <DismissibleNotice {...args} />,
    args: {
        dismissible: true,
    },
};

