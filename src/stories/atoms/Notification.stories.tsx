import type { Meta, StoryObj } from "@storybook/react";
import { Notification } from "../../components/Notification";
import { Text } from "../../components/Text";
import { Button } from "../../components/Button";
import React from "react";
import { css } from "styled-components";
import { color } from "../../utilities/colors";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Notification> = {
    title: "Atoms/Notification",
    component: Notification,
    tags: ["autodocs"],
    args: {
        visible: true,
    },
    argTypes: {},
    parameters: {
        docs: {
            description: {
                component:
                    "This is the notification component for displaying individual notifications in any format. Use this in tandem with the NotificationPanel component to handle positioning and support for multiple stacked notifications.",
            },
        },
    },
};

export default meta;
type Story = StoryObj<typeof Notification>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
    args: {
        title: "Success!",
        message: "You're looking at a notification component!",
    },
    parameters: {
        docs: {
            description: {
                story: "With no arguments, you'll see 'info' notification by default, with no buttons.",
            },
        },
    },
};
export const Visibility: Story = {
    args: {
        title: "Success!",
        message: "You're looking at a notification component!",
        dismissable: true,
        onDismiss: () => {
            alert("notification has been dismissed");
        },
    },
    parameters: {
        docs: {
            description: {
                story: "To control visibility, you'll need to pass in your own onDismiss method. We leave visibility up to YOU to control, because your implementation of this component relies on the needs of your application.",
            },
        },
    },
};
export const WithButtons: Story = {
    args: {
        title: "Hi there!",
        message: "Have you had your shake today?",
        dismissable: true,
        id: "notice-shake",
        onDismiss: (id?: string) => {
            alert(`dismissed: ${id}`);
        },
        buttons: (
            <>
                <Button $type={"text"} $label="Yes" />
                <Button $type={"text"} $label="No" />
            </>
        ),
        type: "help",
    },
    parameters: {
        docs: {
            description: {
                story: "The buttons properties let you pass in your own button components. The notification component is built to handle their styling and positioning for you.",
            },
        },
    },
};
export const CustomTextComponent: Story = {
    args: {
        title: (
            <Text $type="span" $bold>
                IMPORTANT NOTICE
            </Text>
        ),
        message: (
            <Text>
                To the owner of the<strong> Blue Honda Prelude</strong>, your lights are on.
            </Text>
        ),
    },
    parameters: {
        docs: {
            description: {
                story: "You can pass in your own Text component, this gives you the ability to add bold or emphasis to your messages",
            },
        },
    },
};
export const CustomStyles: Story = {
    args: {
        title: "Customized",
        message: "You've been notified about a custom styled notification",
        styles: css`
            background-color: ${color("yellow")};
        `,
    },
    parameters: {
        docs: {
            description: {
                story: "You can pass in your own styles if you need, but hopefully you won't need to.",
            },
        },
    },
};
