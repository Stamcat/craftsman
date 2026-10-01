import type { Meta, StoryObj } from "@storybook/react-vite";
import { Input } from "../../components/Input/Input";
import { width } from "../../styles/utilities/layout";
import { zLabelPosition, zTextInputType } from "../../utilities/types";
import { LuSearch } from "react-icons/lu";

const meta: Meta<typeof Input> = {
    title: "Atoms/Input/Input",
	component: Input,
	tags: ["autodocs"],
    parameters: {
        layout: "padded",
    },
	args: {
		type: "text",
        id: "testInput",
		placeholder: "Type here",
        label: "Favorite Cat",
        labelPosition: "top",
        required: false,
	},
    argTypes: {
        type: {
            control: "select",
            options: zTextInputType.options,
        },
        label: { control: "text" },
        labelPosition: {
            control: "select",
            options: zLabelPosition.options,
        },
        required: { control: "boolean" },
        error: { control: "text" },
        endAdornment: { control: false },
        width: { control: "text" },
        inputClassName: { control: "text" },
        labelClassName: { control: "text" },
        labelStyle: { control: false },
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Required: Story = {
    args: {
        label: "Last Name",
        type: "text",
        placeholder: "Your Last Name",
        required: true,
    },
};
export const FullWidth: Story = {
    args: {
        label: "Last Name",
        inputStyle: { width: "100%" }
    },
};

export const CustomWidth: Story = {
    args: {
        label: "Width prop",
        width: "50%",
    },
    parameters: {
        docs: {
            description: {
                story: "The `width` prop accepts any CSS length (`\"50%\"`, `\"320px\"`, `\"20rem\"`) and sets it via the `--input-width` CSS variable, so it's inherited by the field without needing `inputStyle`.",
            },
        },
    },
    render: (args) => (
        <div style={{ display: "grid", gap: width("gutter") }}>
            <Input {...args} label="50%" width="50%" />
            <Input {...args} label="320px" width="320px" />
            <Input {...args} label="auto (default)" width={undefined} />
        </div>
    ),
};
export const PreAdornment: Story = {
    args: {
        label: "Search",
        labelPosition: "inside",
        preAdornment: <LuSearch />
    },
};

export const WithErrorMessage: Story = {
    args: {
        label: "Email",
        type: "email",
        placeholder: "you@email.com",
        error: "Please enter a valid value.",
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
            <Input {...args} label="Top" labelPosition="top" placeholder="Top label" />
            <Input {...args} label="Left" labelPosition="left" placeholder="Left label" />
            <Input {...args} label="Bottom" labelPosition="bottom" placeholder="Bottom label" />
            <Input {...args} label="Right" labelPosition="right" placeholder="Right label" />
            <Input {...args} label="Inside" labelPosition="inside" placeholder="Inside label" />
            <Input {...args} label="Hidden label" labelPosition="hidden" placeholder="Hidden label" />
        </div>
    ),
};

const customWrapperStyles: React.CSSProperties = {
    background: "#f8fafc",
    border: "1px solid #e2e8f0",
    borderRadius: "10px",
    padding: width("gutter", 0.5),
};

export const WrapperStyled: Story = {
    args: {
        label: "Styled Wrapper",
        placeholder: "Input with wrapper styles",
        style: customWrapperStyles,
    },
};

export const StyleHooks: Story = {
    args: {
        label: "Custom style hooks",
        labelStyle: { color: "#2563eb", fontWeight: 600 },
        labelClassName: "my-custom-label",
        inputClassName: "my-custom-input",
    },
    parameters: {
        docs: {
            description: {
                story: "`labelStyle`/`labelClassName` target the wrapping `<label>`, `inputClassName` targets the `<input>` element itself (alongside the existing `inputStyle`), and `style`/`className` target the outer wrapper.",
            },
        },
    },
};
