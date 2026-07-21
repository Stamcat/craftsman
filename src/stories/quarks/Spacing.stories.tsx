import type { Meta, StoryObj } from "@storybook/react-vite";
import styled from "@emotion/styled";
import { width } from "../../styles/utilities/layout";
import { LayoutWidthsSchema, ScreenWidthSchema, type LayoutWidthsType } from "../../styles/utilities/types";
import { css } from "@emotion/react";
import { color } from "../../styles/utilities/color";

const StoryLayout = styled.div`
    display: grid;
    gap: ${width("gutter", 1.5)};
`;
const SpaceExample = styled.div`
    padding: ${width("gutter")};
    display: inline-flex;
    gap: ${width("gutter")};
    flex-flow: row nowrap;
    align-items: center;
`;
const Spacer = styled.div<{ type: LayoutWidthsType, multiplier?: number}>`
    background-color: ${color("gray500")};
    display: block;
    height: ${width("gutter", 2)};
    ${(props) => css`
        width: ${width(props.type, props.multiplier || 1)};
    `}
    
`;
const ScreenSection = styled.section`
    background-color: ${color("gray200")};
    padding: ${width("gutter")};
    margin: ${width("gutter")};
    overflow-x: scroll;
`;
const meta: Meta = {
    title: "Quarks/Spacing",
    parameters: {
        layout: "padded",
        docs: {
            description: {
                component:
                    "Practical spacing examples using CSS variables, width(), and breakpoint(). Override --w-gutter and all layouts update automatically.",
            },
        },
    },
};
export default meta;
type Story = StoryObj<typeof meta>;

const SpacingExamples = () => (
        <StoryLayout>
            <header>
                <h3>Spacing Examples</h3>
            </header>
            <p>Craftsman comes out of the box with spacing declarations that have been time-tested over decades of building enterprise-grade applications. We offer both CSS variables (prefixed with --w-) as well as a Typescript utility comes strictly typed to make your implementation code easy to use.</p>
            <p>The Typescript utility includes an optional multiplier argument that makes variations very simple, which you can also achieve using css calc.</p>
            <code>
<pre>
// Using CSS <br />  
{".container {"}<br/>           
{"     gap: calc(var(--w-gutter) * 1.5);"} <br />
{"}"}<br /><br />
// Using JS Width Utility <br />
{"const Container = styled.div`"}<br />
{"     gap: ${width(\"gutter\", 1.5)};"}<br />
{"`;"}
</pre>
                    
            </code>
            <section>
                <h4>List of width JS declarations and their css output</h4>
                <code><pre>
                    {LayoutWidthsSchema.options.map((w) => {
                        return <>{"${width("}{w}{")} => "} {width(w)}<br /></>
                    })}
                    </pre>
                </code>
            </section>
            <section>
                    <h4>General Spacers</h4>
                    <SpaceExample>
                        <Spacer type={"gutter"} multiplier={0.5} />
                        <label>gutter (half)</label>
                    </SpaceExample>
                    <SpaceExample>
                        <Spacer type={"gutter"} />
                        <label>gutter</label>
                    </SpaceExample>
                    <SpaceExample>
                        <Spacer type={"gutter"} multiplier={2} />
                        <label>gutter (double)</label>
                    </SpaceExample>
                    <SpaceExample>
                        <Spacer type={"column"} />
                        <label>column</label>
                    </SpaceExample>
                    <SpaceExample>
                        <Spacer type={"column"} multiplier={2} />
                        <label>2 columns*</label>
                    </SpaceExample>
                    <footer>
                        <small>*Note when using the column multiplier, the utility includes gutter between columns in its calculations.</small>
                    </footer>
            </section>
            <ScreenSection>
                <h4>Screen Sizes (Minimum)</h4>
                {ScreenWidthSchema.options.map((key) => (
                    <SpaceExample key={key}>
                        <Spacer type={key as LayoutWidthsType} />
                        <label>{key}</label>
                    </SpaceExample>
                ))}
            </ScreenSection>
        </StoryLayout>
);

export const InUseExamples: Story = {
    render: () => <SpacingExamples />,
};

