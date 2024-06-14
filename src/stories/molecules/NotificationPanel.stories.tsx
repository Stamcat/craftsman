import type { Meta, StoryObj } from "@storybook/react";
import { NotificationPanel } from "../../components/NotificationPanel";
import { Notification } from "../../components/Notification";
import React from "react";
import { css } from "styled-components";
import { gutter } from "../../utilities/layout";
import { color } from "../../utilities/colors";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof NotificationPanel> = {
    title: "Molecules/NotificationPanel",
    component: NotificationPanel,
    tags: ["autodocs"],
    args: {
        children: (
            <Notification
                type="help"
                title="Notification"
                message="You've been notified about a thing"
                dismissable={true}
            />
        ),
    },
    argTypes: {},
    parameters: {
        docs: {
            description: {
                component:
                    "NotificationPanel provides a container for your notifications. This allows you to list multiple notifications in one place. By default the NotificationPanel is inline. Be sure to toggle 'topRight' to see how the behavior changes!",
            },
        },
    },
};

export default meta;
type Story = StoryObj<typeof NotificationPanel>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
    args: {},
};
export const MultipleNotifications: Story = {
    args: {
        position: "inline",
        children: (
            <>
                <Notification
                    type="help"
                    title="Notification"
                    message="You've been notified about a thing"
                    dismissable={true}
                />
                <Notification
                    type="success"
                    title="Success"
                    message="You've been notified about another thing"
                    dismissable={true}
                />
            </>
        ),
    },
    parameters: {
        docs: {
            description: {
                story: "Every child of the NotificationPanel automatically gets a margin-top so that you can list multiple notifications if you need.",
            },
        },
    },
};
export const CustomStyles: Story = {
    args: {
        position: "inline",
        styles: css`
            background-color: ${color("blueVeryLight")};
            padding: ${gutter(0.5)};
            border-radius: 5px;
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
