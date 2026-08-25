import type { Meta, StoryObj } from "@storybook/react-vite";
import { InputNumber } from "../../components/InputNumber/InputNumber";
import { zLabelPosition, zTextInputType } from "../../utilities/types";


const meta: Meta<typeof InputNumber> = {
    title: "Atoms/Input/InputNumber",
	component: InputNumber,
	tags: ["autodocs"],
    parameters: {
        layout: "padded",
    },
	args: {
		type: "number",
        id: "testInput",
		placeholder: "0",
        label: "Beers consumed",
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
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

