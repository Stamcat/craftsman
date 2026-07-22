import type { Meta, StoryObj } from "@storybook/react-vite";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { Input } from "../../components/Input";
import { width } from "../../styles/utilities/layout";

const labelPositionOptions = ["top", "left", "bottom", "right", "inside", "hidden"];

const meta: Meta<typeof Input> = {
    title: "Atoms/Input",
	component: Input,
	tags: ["autodocs"],
	args: {
		type: "text",
        id: "testInput",
		placeholder: "Type here",
        label: "Your Favorite",
        labelPosition: "top",
        required: false,
	},
    argTypes: {
        label: { control: "text" },
        labelPosition: {
            control: "select",
            options: labelPositionOptions,
        },
        required: { control: "boolean" },
        error: { control: "text" },
        styles: { control: false },
    },
	parameters: {
		layout: "padded",
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Required: Story = {
    args: {
        label: "Email",
        type: "email",
        placeholder: "you@company.com",
        required: true,
    },
};

export const WithErrorMessage: Story = {
    args: {
        label: "Phone",
        type: "tel",
        placeholder: "(555) 123-4567",
        error: "Please enter a valid value.",
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
            <Input {...args} label="Top" labelPosition="top" placeholder="Top label" />
            <Input {...args} label="Left" labelPosition="left" placeholder="Left label" />
            <Input {...args} label="Bottom" labelPosition="bottom" placeholder="Bottom label" />
            <Input {...args} label="Right" labelPosition="right" placeholder="Right label" />
            <Input {...args} label="Inside" labelPosition="inside" placeholder="Inside label" />
            <Input {...args} label="Hidden label" labelPosition="hidden" placeholder="Hidden label" />
        </PositionsGrid>
    ),
};

const customWrapperStyles = css`
	background: #f8fafc;
	border: 1px solid #e2e8f0;
	border-radius: 10px;
	padding: ${width("gutter", 0.5)};
`;

export const WrapperStyled: Story = {
    args: {
        label: "Styled Wrapper",
        placeholder: "Input with wrapper styles",
        styles: customWrapperStyles,
    },
};
