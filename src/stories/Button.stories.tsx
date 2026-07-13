import type { Meta, StoryObj } from "@storybook/react-vite";
import { css } from "@emotion/react";
import { Button } from "../components/Button";
import { ButtonType } from "../styles/global/components/button";
import { Loader } from "../components";
import { GiFlatbed, GiDiceSixFacesFive, GiBatLeth } from "react-icons/gi";
import { GrBike } from "react-icons/gr";
import styled from "@emotion/styled";
import { width } from "../styles/utilities/layout";
import { ImRocket } from "react-icons/im";

const Wrapper = styled.div`
    display: inline-flex;
    gap: ${width("gutter")};
    width: 100%;
    margin: ${width("gutter")} 0;
`;
const rocketStyles = css`
    display: inline-flex;
    flex-flow: column wrap;
    padding: ${width("gutter", 0.5)} ${width("gutter")};
`;
const meta: Meta<typeof Button> = {
    title: "Components/Button",
    component: Button,
    tags: ["autodocs"],
    args: {
        children: "Click me",
        variant: "default",
        type: "button",
        disabled: false,
    },
    argTypes: {
        children: {
            control: "text",
            description: "Button label content",
        },
        variant: {
            control: "select",
            options: ButtonType.options,
        },
        size: {
            control: "number",
        },
        type: {
            control: "select",
            options: ["button", "submit", "reset"],
            description: "Native button type attribute",
        },
        disabled: {
            control: "boolean",
            description: "Disables the button",
        },
        className: {
            control: "text",
            description: "Optional CSS class name",
        },
        "aria-label": {
            control: "text",
            description: "Accessible label when text content is not descriptive",
        },
        styles: {
            control: false,
        },
    },
    parameters: {
        layout: "padded",
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Primary: Story = {
    args: {
        children: "Primary",
        variant: "primary",
    },
};

export const Text: Story = {
    args: {
        children: "Text",
        variant: "text",
    },
};
export const WithIcon: Story = {
    parameters: {
        docs: {
            description: {
                story: "We don't need to do any special integration here. If you want to show a loading state, just include your icon as your button's child content."
            }
        }
    },
    render: () => (
        <>
            <Wrapper>
                <Button variant="primary">
                    <GiFlatbed size={30} /><span>&nbsp; Truck</span>
                </Button>
                <Button>
                    <span>Bike &nbsp;</span><GrBike size={24} />
                </Button>
            </Wrapper>
            <Wrapper>
                <Button styles={rocketStyles}>
                    <ImRocket size={24} />
                    <p>Rocket</p>
                </Button>
            </Wrapper>
        </>
    ),

};
export const Mini: Story = {
    args: {
        children: <><GiDiceSixFacesFive />&nbsp; Let's Roll!</>,
        variant: "primary",
        size: 0.5
    },
};
export const XL: Story = {
    args: {
        children: <><GiBatLeth />&nbsp; Qa'Plah!</>,
        variant: "primary",
        size: 2.875
    },
};

export const Disabled: Story = {
    parameters: {
        layout: "padded",
        docs: {
            description: {
                story: "Passing disabled PARAMETER will fully disable functionality. However, if you want it to look disabled but still have some click event, you can give it a disabled className and only apply the disabled styles",
            }
        }
    },
    args: {
        children: "Disabled but Still Clickable",
        disabled: false,
        className: "disabled",
        onClick: () => alert("Disabled button Clicked")
    },
};
export const FullyDisabled: Story = {
    args: {
        children: "Fully Disabled",
        disabled: true,
        onClick: () => alert("Disabled button is not clickable, you'll never see this")
    },
};

export const Loading: Story = {
    parameters: {
        docs: {
            description: {
                story: "We don't need to do any special integration here. If you want to show a loading state, just use <Loader> as your button's child content."
            }
        }
    },

    args: {
        children: <Loader type="boxy" width={50} color="#de13ca" />,
    },
};

export const AsSubmit: Story = {
    args: {
        children: "Save",
        type: "submit",
        "aria-label": "Save form",
    },
};

export const WithClassName: Story = {
    args: {
        children: "Class + Variant",
        variant: "primary",
        className: "custom-cta",
    },
};

export const WithAriaLabel: Story = {
    args: {
        children: "Save",
        variant: "primary",
        "aria-label": "Save changes",
    },
};

export const WithEmotionStyles: Story = {
    args: {
        children: "Custom Emotion Style",
        variant: "default",
        styles: css`
            border: 1px dashed var(--purple500);
            background: var(--purple50);
            color: var(--purple900);
            &:hover {
                background: var(--purple100);
            }
        `,
    },
};
