import type { Meta, StoryObj } from "@storybook/react-vite";
import { InputPhone } from "../../components/InputPhone/InputPhone";
import { width } from "../../styles/utilities/layout";
import { zLabelPosition } from "../../utilities/types";

const meta: Meta<typeof InputPhone> = {
    title: "Atoms/Input/InputPhone",
    component: InputPhone,
    tags: ["autodocs"],
    parameters: {
        layout: "padded",
        docs: {
            story: {
                iframeHeight: 350,
            },
        },
    },
    args: {
        id: "testInputPhone",
        label: "Phone Number",
        labelPosition: "top",
        required: false,
        defaultCountry: "us",
    },
    argTypes: {
        label: { control: "text" },
        labelPosition: {
            control: "select",
            options: zLabelPosition.options,
        },
        required: { control: "boolean" },
        error: { control: "text" },
        defaultCountry: { control: "text" },
        endAdornment: { control: false },
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Required: Story = {
    args: {
        label: "Mobile Number",
        required: true,
    },
};

export const WithErrorMessage: Story = {
    args: {
        label: "Phone Number",
        error: "Please enter a valid phone number.",
    },
};

export const PreferredCountries: Story = {
    args: {
        label: "Phone Number",
        preferredCountries: ["us", "gb", "ca", "au"],
    },
};

const positionsGridStyle: React.CSSProperties = {
    display: "grid",
    gap: width("gutter"),
    maxWidth: width("column", 5),
};

export const LabelPositions: Story = {
    render: (args) => (
        <div style={positionsGridStyle}>
            <InputPhone {...args} label="Top" labelPosition="top" />
            <InputPhone {...args} label="Left" labelPosition="left" />
            <InputPhone {...args} label="Bottom" labelPosition="bottom" />
            <InputPhone {...args} label="Right" labelPosition="right" />
            <InputPhone {...args} label="Hidden label" labelPosition="hidden" />
        </div>
    ),
};
