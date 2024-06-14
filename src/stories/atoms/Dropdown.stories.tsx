import type { Meta, StoryObj } from "@storybook/react";
import { Dropdown } from "../../components/Dropdown";
import { countries } from "../../utilities/countries";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Dropdown> = {
    title: "Atoms/Dropdown",
    component: Dropdown,
    tags: ["autodocs"],
    argTypes: {
        $error: {
            control: {
                type: "text",
            },
        },
    },
    args: {
        $label: "Default Dropdown",
        $labelPosition: "top",
        $options: [
            { key: "Default", label: "Default" },
            { key: "Another", label: "Another Value" },
        ],
        disabled: false,
    },
};

export default meta;
type Story = StoryObj<typeof Dropdown>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {};
export const CountrySelector: Story = {
    parameters: {
        docs: {
            description: {
                story: "Country names are localized content. Since we don't want to tell you how you should localize your content, here's an example you can reference as a starting point for setting up your country selector dropdown. Eventually we plan to support icons & flags in the label, but for now we need to keep it simple.",
            },
        },
    },
    args: {
        $options: countries,
        $labelPosition: "top",
        $label: "Select Country",
    },
};
export const TopLabel: Story = {
    args: {
        $options: [{ key: "Default", label: "Default" }],
        $labelPosition: "top",
        $label: "Dropdown With Label (top)",
    },
};
export const LeftLabel: Story = {
    args: {
        $options: [{ key: "Default", label: "Default" }],
        $labelPosition: "left",
        $label: "Dropdown With Label (left)",
    },
};
