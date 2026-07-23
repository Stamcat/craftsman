import type { Meta, StoryObj } from "@storybook/react-vite";
import styled from "@emotion/styled";
import { useState } from "react";
import { RadioButton } from "../../components/RadioButton";
import { width } from "../../styles/utilities/layout";

const Container = styled.div`
	display: grid;
	gap: ${width("gutter", 0.5)};
`;

const captainOptions = [
	{ id: "captain-kirk", value: "Kirk", label: "James Tiberius Kirk" },
	{ id: "captain-picard", value: "Picard", label: "Jean-Luc Picard" },
	{ id: "captain-janeway", value: "Janeway", label: "Kathryn Janeway" },
	{ id: "captain-sisko", value: "Sisko", label: "Benjamin Sisko" },
	{ id: "captain-pike", value: "Pike", label: "Christoper Pike" },
];

type CaptainRadioGroupProps = {
    name?: string;
    labelPosition?: "right" | "left";
    initialValue?: string;
    sharedProps: Omit<React.ComponentProps<typeof RadioButton>, "id" | "value" | "label" | "checked" | "defaultChecked" | "onChange">;
};

const CaptainRadioGroup = ({
    name = "favorite-captain",
    labelPosition = "right",
    initialValue = "Picard",
    sharedProps,
}: CaptainRadioGroupProps) => {
    const [selected, setSelected] = useState<string>(initialValue);

    return (
        <Container>
            {captainOptions.map((option) => (
                <RadioButton
                    {...sharedProps}
                    key={option.id}
                    id={option.id}
                    name={name}
                    value={option.value}
                    label={option.label}
                    labelPosition={labelPosition}
                    defaultChecked={initialValue === option.value}
                    onChange={(event) => setSelected(event.currentTarget.value)}
                />
            ))}
            <small>Selected: {selected}</small>
        </Container>
    );
};

const defaultStorySource = `const [selected, setSelected] = useState("Picard");

return (
	<Stack>
		{captainOptions.map((option) => (
			<RadioButton
				key={option.id}
				name="favorite-captain"
				id={option.id}
				value={option.value}
				label={option.label}
				labelPosition="right"
				defaultChecked={selected === option.value}
				onChange={(event) => setSelected(event.currentTarget.value)}
			/>
		))}
		<small>Selected: {selected}</small>
	</Stack>
);`;

const singleWithErrorSource = `<RadioButton
	id="single-radio-error"
	name="single-radio"
	value="kirk"
	label="James Tiberius Kirk"
	labelPosition="right"
	error="Please select this option to continue."
/>`;

const meta: Meta<typeof RadioButton> = {
	title: "Atoms/RadioButton",
	component: RadioButton,
	tags: ["autodocs"],
	parameters: {
		layout: "padded",
	},
	args: {
		id: "radio-button-default",
		name: "favorite-captain",
		value: "Picard",
        labelPosition: "right"
	},
	argTypes: {
		type: { control: false },
		endAdornment: { control: false },
		styles: { control: false },
		error: { control: "text" },
        value: {
            control: "select",
            options: captainOptions.map((c) => c.value),
        },
		labelPosition: {
            control: "select",
            options: ["right", "left"],
        },
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		value: "Picard",
	},
	parameters: {
		docs: {
			source: {
				code: defaultStorySource,
			},
		},
	},
    render: (args) => (
        <CaptainRadioGroup
            name={args.name}
            labelPosition={(args.labelPosition as "right" | "left") || "right"}
            initialValue={(args.value as string) || "Picard"}
            sharedProps={{ ...args }}
        />
    ),
};


export const SingleWithError: Story = {
	args: {
		id: "single-radio-error",
		name: "single-radio",
		value: "Kirk",
		label: "James Tiberius Kirk",
		labelPosition: "right",
		error: "Please select this option to continue.",
	},
	parameters: {
		docs: {
			source: {
				code: singleWithErrorSource,
			},
		},
	},
	render: (args) => (
		<Container>
			<RadioButton {...args} />
		</Container>
	),
};
