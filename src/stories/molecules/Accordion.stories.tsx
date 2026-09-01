import type { Meta, StoryObj } from "@storybook/react-vite";
import { Accordion } from "../../components/Accordion/Accordion";

const meta: Meta<typeof Accordion> = {
    title: "Molecules/Accordion",
    component: Accordion,
    tags: ["autodocs"],
    args: {
        items: [
            { id: "shipping", header: "Shipping", content: <p>Ships in 3-5 business days.</p> },
            { id: "returns", header: "Returns", content: <p>30-day return window.</p> },
            { id: "support", header: "Support", content: <p>Contact us any time at support@example.com.</p> },
        ],
    },
    argTypes: {
        multiple: { control: "boolean" },
    },
};

export default meta;

type Story = StoryObj<typeof Accordion>;

export const Default: Story = {};

export const Multiple: Story = {
    args: {
        multiple: true,
        defaultExpanded: ["shipping"],
    },
};

export const WithDisabledItem: Story = {
    args: {
        items: [
            { id: "shipping", header: "Shipping", content: <p>Ships in 3-5 business days.</p> },
            { id: "returns", header: "Returns (unavailable)", content: <p>30-day return window.</p>, disabled: true },
        ],
    },
};
