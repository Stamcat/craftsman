import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import styled from "@emotion/styled";
import { Modal } from "../components/Modal";
import { Button } from "../components/Button";
import { width } from "../styles/utilities/layout";

const meta: Meta<typeof Modal> = {
	title: "Components/Modal",
	component: Modal,
	tags: ["autodocs"],
	parameters: {
		layout: "padded",
		// docs: {
		// 	description: {
		// 		component: "A simple modal that supports dialog and right-side panel modes, dismiss controls, and optional footer actions.",
		// 	},
		// },
        docs: {
            story: {
                inline: false,
                iframeHeight: 500,
            },
        },
	},
	argTypes: {
		type: {
			control: "select",
			options: ["dialog", "panel"],
		},
		backgroundDismiss: {
			control: "boolean",
		},
		hideDismissIcon: {
			control: "boolean",
		},
		visible: {
			control: false,
			description: "Controlled internally in each story using local state.",
		},
		onDismiss: {
			control: false,
		},
		children: {
			control: false,
		},
		footer: {
			control: false,
		},
		styles: {
			control: false,
		},
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

const ExampleContent = styled.div`
	display: flex;
	flex-direction: column;
	gap: ${width("gutter", 0.5)};

	h3 {
		margin: 0;
	}

	p {
		margin: 0;
	}
`;

const ExampleFooter = ({ onClose }: { onClose: () => void }) => {
	return (
		<>
			<Button onClick={onClose}>Cancel</Button>
			<Button variant="primary" onClick={onClose}>Confirm</Button>
		</>
	);
};

const ExampleModal = ({
	type,
	header,
	backgroundDismiss,
	hideDismissIcon,
}: {
	type: "dialog" | "panel";
	header: string | React.ReactNode;
	backgroundDismiss?: boolean;
	hideDismissIcon?: boolean;
}) => {
	const [visible, setVisible] = useState(false);

	return (
		<>
			<Button variant="primary" onClick={() => setVisible(true)}>
				Open {type === "panel" ? "Panel" : "Dialog"}
			</Button>
			<Modal
				visible={visible}
				onDismiss={() => setVisible(false)}
				type={type}
				header={header}
				backgroundDismiss={backgroundDismiss}
				hideDismissIcon={hideDismissIcon}
				footer={<ExampleFooter onClose={() => setVisible(false)} />}
			>
				<ExampleContent>
					<p>
						This is an interactive modal example. Use the close icon, background click (if enabled), or footer actions to dismiss.
					</p>
					<p>
						The modal supports custom children, optional header text, and a footer slot for action buttons.
					</p>
				</ExampleContent>
			</Modal>
		</>
	);
};

export const Dialog: Story = {
	render: () => (
		<ExampleModal
			type="dialog"
			header={<h4>Dialog Example</h4>}
			backgroundDismiss={true}
			hideDismissIcon={false}
		/>
	),
};

export const Panel: Story = {
	render: () => (
		<ExampleModal
			type="panel"
			header="Panel Example"
			backgroundDismiss={true}
			hideDismissIcon={false}
		/>
	),
};

export const NonDismissableBackground: Story = {
	render: () => (
		<ExampleModal
			type="dialog"
			header="No Background Dismiss"
			backgroundDismiss={false}
			hideDismissIcon={false}
		/>
	),
};
