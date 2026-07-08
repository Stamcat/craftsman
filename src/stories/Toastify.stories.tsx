import type { Meta, StoryObj } from "@storybook/react-vite";
import { useRef } from "react";
import styled from "@emotion/styled";
import { toast, ToastContainer, type ToastContainerProps } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { width } from "../styles/utilities/layout";
import { Button } from "../components/Button";

type StoryArgs = Pick<ToastContainerProps, "position" | "autoClose" | "theme" | "closeOnClick" | "pauseOnHover" | "draggable" | "newestOnTop">;

const meta: Meta<StoryArgs> = {
    title: "Components/Toast",
    tags: ["autodocs"],
    args: {
        position: "bottom-right",
        autoClose: 3000,
        theme: "light",
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        newestOnTop: false,
    },
    argTypes: {
        position: {
            control: "select",
            options: ["top-right", "top-center", "top-left", "bottom-right", "bottom-center", "bottom-left"],
        },
        autoClose: {
            control: { type: "number", min: 500, max: 10000, step: 500 },
            description: "Milliseconds before auto-dismiss. Set to false to disable.",
        },
        theme: {
            control: "select",
            options: ["light", "dark", "colored"],
        },
        closeOnClick: { control: "boolean" },
        pauseOnHover: { control: "boolean" },
        draggable: { control: "boolean" },
        newestOnTop: { control: "boolean" },
    },
    parameters: {
        layout: "padded",
        docs: {
            description: {
                story: "There's no need to re-invent a toast notification. Craftsman implements react-toastify - a simple, lightweight toast notification library.",
            },
        },
    },
};

export default meta;
type Story = StoryObj<StoryArgs>;

const Page = styled.div`
    display: grid;
    gap: ${width("gutter")};
    max-width: ${width("column", 8)};
`;

const Section = styled.section`
    display: grid;
    gap: ${width("gutter", 0.5)};
`;

const ButtonRow = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: ${width("gutter", 0.5)};
`;

type DemoRowProps = {
    readonly label: string;
    readonly code: string;
    readonly onTrigger: () => void;
    readonly onScrollToToast: () => void;
};

function DemoRow({ label, code, onTrigger, onScrollToToast }: DemoRowProps) {
    const handleClick = () => {
        onScrollToToast();
        onTrigger();
    };
    return (
        <div
            style={{
                display: "grid",
                gridTemplateColumns: "1fr auto",
                alignItems: "center",
                gap: "1rem",
                borderBottom: "1px solid #e2e8f0",
                paddingBottom: "0.75rem",
            }}
        >
            <code><pre>{code}</pre></code>
            <ButtonRow>
                <Button onClick={handleClick}>{label}</Button>
            </ButtonRow>
        </div>
    );
}

function UsageGuideDemo(args: Readonly<StoryArgs>) {
    const toastAnchorRef = useRef<HTMLDivElement>(null);

    const scrollToToast = () => {
        toastAnchorRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    };

    const showPromiseToast = () => {
        void toast.promise(
            new Promise((resolve) => {
                globalThis.setTimeout(resolve, 1500);
            }),
            {
                pending: "Saving changes...",
                success: "Changes saved",
                error: "Unable to save changes",
            },
        );
    };

        return (
            <Page>
                <Section>
                    <h2>react-toastify</h2>
                    <p><a href="https://www.npmjs.com/package/react-toastify" target="_blank" rel="noreferrer">Full documentation available here</a></p>
                    <p>
                        Render one <code>ToastContainer</code> near the root of your app.
                        Then call <code>toast(...)</code> anywhere in response to user actions.
                        Use the <strong>controls panel</strong> to configure the container options live.
                    </p>
                    <code><pre>{`import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

<ToastContainer position="bottom-right" autoClose={3000} />`}</pre></code>
                </Section>

                <Section>
                    <h3>Live demos</h3>
                    <DemoRow
                        label="Run"
                        code={`toast("Default notification")`}
                        onTrigger={() => toast("Default notification")}
                        onScrollToToast={scrollToToast}
                    />
                    <DemoRow
                        label="Run"
                        code={`toast.success("Changes saved")`}
                        onTrigger={() => toast.success("Changes saved")}
                        onScrollToToast={scrollToToast}
                    />
                    <DemoRow
                        label="Run"
                        code={`toast.error("Something went wrong")`}
                        onTrigger={() => toast.error("Something went wrong")}
                        onScrollToToast={scrollToToast}
                    />
                    <DemoRow
                        label="Run"
                        code={`toast.info("Here's something to know")`}
                        onTrigger={() => toast.info("Here's something to know")}
                        onScrollToToast={scrollToToast}
                    />
                    <DemoRow
                        label="Run"
                        code={`toast.promise(asyncOperation(), {
  pending: "Saving changes...",
  success: "Changes saved",
  error: "Unable to save changes",
})`}
                        onTrigger={showPromiseToast}
                        onScrollToToast={scrollToToast}
                    />
                </Section>

                <div ref={toastAnchorRef}>
                    <ToastContainer {...args} />
                </div>
            </Page>
        );
}

export const UsageGuide: Story = {
    render: (args) => <UsageGuideDemo {...args} />,
};
