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

export const Disabled: Story = {
    args: {
        label: "Read-only Notes",
        defaultValue: "This field is disabled.",
        disabled: true,
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
