import type { Meta, StoryObj } from "@storybook/react";
import { Text } from "../../components/Text/Text";
import { TextSize, TextTags } from "../../utilities/types";

const meta: Meta<typeof Text> = {
	title: "Atoms/Text",
	component: Text,
	tags: ["autodocs"],
	args: {
		children: "The quick brown fox jumps over the lazy dog.",
        richText: false,
    },
    argTypes: {
        richText: {
            control: "boolean"
        },
        as: {
            control: "select",
            options: TextTags.options
        },
        size: {
            control: "select",
            options: TextSize.options
        }
    },
};

export default meta;

type Story = StoryObj<typeof Text>;

export const Default: Story = {};

export const Paragraph: Story = {
	args: {
		as: "p",
	},
};

export const CenterAligned: Story = {
	args: {
		as: "p",
		alignment: "center",
	},
};

export const RichText: Story = {
	args: {
		richText: true,
		children:
			'<p><strong>Rich text</strong> with a <a href="https://example.com" target="_blank">sanitized link</a>.</p>',
	},
};

export const TypeDisplay: Story = {
	args: { type: "display" },
};

export const TypeHeading: Story = {
	args: { type: "heading" },
};

export const TypeParagraph: Story = {
	args: { type: "paragraph" },
};

export const TypeCaption: Story = {
	args: { type: "caption" },
};

export const TypeSmallTitle: Story = {
	args: { type: "small-title" },
};

export const SizeXLarge: Story = {
	args: { size: "xlarge" },
};

export const SizeLarge: Story = {
	args: { size: "large" },
};

export const SizeMedium: Story = {
	args: { size: "medium" },
};

export const SizeSmall: Story = {
	args: { size: "small" },
};

export const SizeXSmall: Story = {
	args: { size: "xsmall" },
};
