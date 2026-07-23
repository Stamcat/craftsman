import type { Meta, StoryObj } from "@storybook/react-vite";
import styled from "@emotion/styled";
import { InputPassword } from "../../components/InputPassword";
import { width } from "../../styles/utilities/layout";
import { zLabelPosition } from "../../styles/utilities/types";

const meta: Meta<typeof InputPassword> = {
    title: "Atoms/InputPassword",
    component: InputPassword,
    tags: ["autodocs"],
    parameters: {
        layout: "padded",
        docs: {
            description: {
                component:
                    "InputPassword extends Input and adds an in-field show/hide toggle. The toggle is keyboard accessible, uses a real button element, and updates aria-label plus aria-pressed when visibility changes.",
            },
        },
    },
    args: {
        id: "testPasswordInput",
        label: "Password",
        placeholder: "Enter your password",
        labelPosition: "top",
        required: false,
        type: "password",
        autoComplete: "current-password",
    },
    argTypes: {
        type: { control: false },
        label: { control: "text" },
        labelPosition: {
            control: "select",
            options: zLabelPosition.options,
        },
        required: { control: "boolean" },
        error: { control: "text" },
        styles: { control: false },
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Required: Story = {
    args: {
        required: true,
    },
};

export const WithErrorMessage: Story = {
    args: {
        error: "Password must be at least 12 characters.",
    },
};

const PositionsGrid = styled.div`
    display: grid;
    gap: ${width("gutter")};
    max-width: ${width("column", 5)};
`;

export const LabelPositions: Story = {
    render: (args) => (
        <PositionsGrid>
            <InputPassword {...args} label="Top" labelPosition="top" placeholder="Top label" />
            <InputPassword {...args} label="Left" labelPosition="left" placeholder="Left label" />
            <InputPassword {...args} label="Bottom" labelPosition="bottom" placeholder="Bottom label" />
            <InputPassword {...args} label="Right" labelPosition="right" placeholder="Right label" />
            <InputPassword {...args} label="Inside" labelPosition="inside" placeholder="Inside label" />
            <InputPassword {...args} label="Hidden label" labelPosition="hidden" placeholder="Hidden label" />
        </PositionsGrid>
    ),
};
