import type { Meta, StoryObj } from "@storybook/react-vite";
import { Textarea } from "../../components/Textarea/Textarea";
import { width } from "../../styles/utilities/layout";
import { zLabelPosition } from "../../utilities/types";

const meta: Meta<typeof Textarea> = {
    title: "Atoms/Input/Textarea",
    component: Textarea,
    tags: ["autodocs"],
    parameters: {
        layout: "padded",
        docs: {
            description: {
                component: "Multi-line text input. Shares the same label, error, and required props as Input.",
            },
        },
    },
    args: {
        id: "testTextarea",
        placeholder: "Type here",
        label: "Your Message",
        labelPosition: "top",
        required: false,
        rows: 4,
    },
    argTypes: {
        label: { control: "text" },
        labelPosition: {
            control: "select",
            options: zLabelPosition.options,
        },
        required: { control: "boolean" },
        error: { control: "text" },
        rows: { control: "number" },
        disabled: { control: "boolean" },
        readOnly: { control: "boolean" },
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
        label: "Feedback",
        placeholder: "Your feedback",
        required: true,
    },
};

export const WithErrorMessage: Story = {
    args: {
        label: "Description",
        placeholder: "Describe the issue",
        error: "This field is required.",
    },
};
export const FullWidth: Story = {
    args: {
        inputStyle: { width: "100%" }
    }
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
            <Textarea {...args} label="50%" width="50%" />
            <Textarea {...args} label="320px" width="320px" />
            <Textarea {...args} label="auto (default)" width={undefined} />
        </div>
    ),
};

export const Disabled: Story = {
    args: {
        label: "Read-only Notes",
        defaultValue: "This field is disabled.",
        disabled: true,
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
                story: "`labelStyle`/`labelClassName` target the wrapping `<label>`, `inputClassName` targets the `<textarea>` element itself (alongside the existing `inputStyle`), and `style`/`className` target the outer wrapper.",
            },
        },
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
            <Textarea {...args} label="Top" labelPosition="top" placeholder="Top label" />
            <Textarea {...args} label="Left" labelPosition="left" placeholder="Left label" />
            <Textarea {...args} label="Bottom" labelPosition="bottom" placeholder="Bottom label" />
            <Textarea {...args} label="Right" labelPosition="right" placeholder="Right label" />
            <Textarea {...args} label="Inside" labelPosition="inside" placeholder="Inside label" />
            <Textarea {...args} label="Hidden label" labelPosition="hidden" placeholder="Hidden label" />
        </div>
    ),
};
