import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../../components/Button";
import React from "react";

const AnchorExample: React.FC = (props) => {
    return <a {...props} />;
};

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Button> = {
    title: "Atoms/Anchor",
    component: AnchorExample,
    tags: ["autodocs"],
    args: {
        children: "Links, zwo, drei, vier.",
    },
    argTypes: {},
    parameters: {
        docs: {
            description: {
                component:
                    "Anchor is styled to look like button type='Text', however it performs all the same functions of a standard anchor tag",
            },
        },
    },
    // decorators: [
    //     (Story) => (
    //         <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
    //             <Story />
    //         </View>
    //     ),
    // ],
};

export default meta;
type Story = StoryObj<typeof Button>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
    // render: () => (<Button>Default Button</Button>),
    // args: {},
};
