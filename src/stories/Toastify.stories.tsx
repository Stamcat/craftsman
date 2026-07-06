import type { Meta, StoryObj } from "@storybook/react-vite";
import styled from "@emotion/styled";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { width } from "../styles/utilities/layout";
import { Button } from "../components/Button";

const meta: Meta = {
    title: "Components/Toastify",
    tags: ["autodocs"],
    parameters: {
        layout: "padded",
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

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

function ToastDemo() {
    const showPromiseToast = () => {
        void toast.promise(
            new Promise((resolve) => {
                window.setTimeout(resolve, 1500);
            }),
            {
                pending: "Saving changes...",
                success: "Changes saved",
                error: "Unable to save changes",
            },
        );
    };


    return (
        <>
            <ButtonRow>
                <Button onClick={() => toast("Default toast")}>Default</Button>
                <Button onClick={() => toast.success("Success toast")}>Success</Button>
                <Button onClick={() => toast.error("Error toast")}>Error</Button>
                <Button onClick={() => toast.info("Informational toast")}>Info</Button>
                <Button onClick={showPromiseToast}>Promise</Button>
            </ButtonRow>
            <ToastContainer position="bottom-right" autoClose={3000} theme="light" />
        </>
    );
}

export const UsageGuide: Story = {
    render: () => (
        <Page>
            <Section>
                <h2>How to use react-toastify</h2>
                <p>
                    Render one <code>ToastContainer</code> near the root of your app,
                    then call <code>toast(...)</code> anywhere in response to user actions.
                </p>
            </Section>

            <Section>
                <h3>1. Add the container</h3>
              
                <code><pre>{`import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function AppShell() {
  return (
    <>
      <YourRoutes />
      <ToastContainer position="bottom-right" autoClose={3000} />
    </>
  );
}`}</pre>
                </code>
            </Section>

            <Section>
                <h3>2. Trigger toasts from user actions</h3>
                <code><pre>
                    {`import { toast } from "react-toastify";

async function handleSave() {
  try {
    await saveChanges();
    toast.success("Changes saved");
  } catch {
    toast.error("Unable to save changes");
  }
}`}</pre>
                </code>
            </Section>

            <Section>
                <h3>3. Use promise toasts for async flows</h3>
             
                <code><pre>{`toast.promise(saveChanges(), {
  pending: "Saving changes...",
  success: "Changes saved",
  error: "Unable to save changes",
});`}</pre>
                </code>
            </Section>

            <Section>
                <h3>Live demo</h3>
                <p>Use the buttons below to preview common toast variants.</p>
                <ToastDemo />
            </Section>
        </Page>
    ),
};
