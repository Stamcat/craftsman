import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { Modal, type ModalType } from "../../components/Modal/Modal";
import { Button } from "../../components/Button";


const ButtonSet: React.FC = () => {
    return (
        <>
            <Button variant="primary">Button Text</Button>
            <Button variant="text">Cancel</Button>
        </>
    );
};
const LongContent: React.FC = () => {
    return (
        <>
            <h4>Long Text is long</h4>
            <p>
                You may have to adjust your browser height & remove storybook controls to see this render properly.
            </p>
            <p>
                This is currently not yet implemented, it is a planned feature enhancement. Button set is fixed to the
                bottom of the modal. When the content runs too long, the modal will scroll, leaving the button set will
                remain and we'll see a box shadow.
            </p>
            <h4>Box Shadows</h4>
            <p>The box shadow only appears when we're in a scrolled state. Otherwise you'll see no box shadow.</p>
        </>
    );
};

const meta: Meta<typeof Modal> = {
    title: "Molecules/Modal",
    component: Modal,
    tags: ["autodocs"],
    args: {
        children: "This is text inside modal component",
        type: "dialog",
        header: "Modal Header",
        visible: true,
        hideDismissIcon: false,
    },
    argTypes: {
        type: {
            control: "select",
            options: ["dialog", "panel"],
        },
        visible: {
            control: "boolean"
        }
    },
    parameters: {
        docs: {
            story: {
                inline: false,
                iframeHeight: 400,
            },
        },
    },
};

export default meta;
type Story = StoryObj<typeof Modal>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const DialogModal: Story = {
    args: {},
    parameters: {
        docs: {
            description: {
                story: "The modal is designed to hide until the visible prop is true. You can control this through click events. Our example implementation shows a stateful component setting visible to true by clicking a button. We can also use the onPressBackground event to hide this modal.",
            },
        },
    },
};

export const PanelModal: Story = {
    args: {
        type: "panel" as ModalType,
        children: "Panel Modal shows contents to the right of the screen",
    },
    parameters: {
        docs: {
            description: {
                story: "By default, modal is of type 'dialog', which puts the content in the center of the screen. However there is another variant called 'panel' which puts content to the right.",
            },
        },
    },
};
export const NoHeader: Story = {
    args: {
        header: undefined,
        children:
            "Dialog modal with no header so that you can do your own custom thing. The space remains open so as to not interfere with the close icon",
    },
    parameters: {
        docs: {
            description: {
                story: "Modals come with a header property by default. This is a string that you can pass in any title and is built such that it won't interfere with the close icon.",
            },
        },
    },
};
export const HiddenDismiss: Story = {
    args: {
        header: "Hidden Dismiss Icon",
        hideDismissIcon: true,
        children: "You can also hide the dismiss icon. But Remember: Just because you can, doesn't mean you should.",
    },
    parameters: {
        docs: {
            description: {
                story: "You can also hide the dismiss icon if you wanted, though, we don't recommend it.",
            },
        },
    },
};

export const ModalButtons: Story = {
    args: {
        header: "Button Container",
        hideDismissIcon: true,
        children:
            "You create the buttons and their handlers, we present them in a box at the bottom of the modal. The primary call to action button should always be to the left as per UI/UX Guidelines",
        footer: <ButtonSet />,
    },
    parameters: {
        docs: {
            description: {
                story: "If you need to add buttons to your modal, we present the container so that you can easily stay on-brand. Because every project is different, you can pass anything you want into this container.",
            },
        },
    },
};

export const ContentOverflow: Story = {
    args: {
        header: "Button Container",
        children: <LongContent />,
        footer: <ButtonSet />,
    },
    parameters: {
        docs: {
            description: {
                story: "If content exceeds 3/4 the height of your viewport, the modal will scroll and buttons will be fixed to the bottom.",
            },
        },
    },
};
