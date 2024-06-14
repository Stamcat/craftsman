import type { Meta, StoryObj } from "@storybook/react";
import { RemoteComponent } from "../../utilities/remote/components/RemoteComponent";
import React from "react";
import { Code } from "../../components/Code";

const meta: Meta<typeof RemoteComponent> = {
    title: "Templates/Module Federation Component",
    component: () => (
        <Code>{`
    <RemoteComponent
        onLoading="Loading router..."
        hostedProps={{ hostedLocale: this.props.locale }}
        remoteHost={"ui/remote/host/path"}
        remoteName={"SomeApplication"}
        component={"SomeComponent"}
        fallback={<Text>{\`ui/remote/host/path - SomeComponent failed to load\`}</Text>}
    />
`}</Code>
    ),
    tags: ["autodocs"],
    args: {
        hostedProps: { testValue: true, testFunction: () => true },
        remoteHost: "ui/remote/host/path",
        remoteName: "SomeApplication",
        component: "SomeComponent",
        onLoading: "Loading remote",
        fallback: <>Fallback Component</>,
        scope: "default",
    },
    parameters: {
        layout: "fullscreen",
    },
};

export default meta;
type Story = StoryObj<typeof RemoteComponent>;

export const Wrapper: Story = {
    parameters: {
        docs: {
            description: {
                story: "If you're using Module Federation, you can use this component to fetch a remotely hosted component for your application. Since this storybook app doesn't currently support Module Federation, we can't show a rendered component, but as you can see from the arguments, RemoteComponent is set up to display a fallback component if the thing you're looking for fails to load.\n\n The hostedProps object can be used to pass ANY overriding value from a HOST to the REMOTE application upon remote load. This can include variables, functions, action dispatches, even entire components. It's up to the remote to implement these values however it sees fit.",
            },
        },
    },
};
