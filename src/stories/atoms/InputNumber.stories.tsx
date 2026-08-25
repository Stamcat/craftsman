import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
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
        min: 0,
        max: 12,
        step: 1,
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
        min: { control: "number" },
        max: { control: "number" },
        step: { control: "number" },
        iconIncrement: { control: false },
        iconDecrement: { control: false },
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Controlled: Story = {
    render: (args) => {
        const [value, setValue] = useState(0);
        return (
            <InputNumber
                {...args}
                value={value}
                onChange={(e) => setValue(Number(e.currentTarget.value))}
            />
        );
    },
};

