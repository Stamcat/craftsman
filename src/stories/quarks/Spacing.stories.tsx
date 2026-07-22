import type { Meta, StoryObj } from "@storybook/react-vite";

import { LayoutWidthsSchema, type LayoutWidthsType } from "../../styles/utilities/types";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { width } from "../../styles/utilities/layout";
import { color } from "../../styles";

type SpacingProps = {
    type: LayoutWidthsType;
    multiplier?: number;
};

const Example = styled.div<SpacingProps>`
    margin-top: ${width("gutter")};
    height: 50px;
    background-color: ${color("purple300")};
    ${(props) =>
        css`
            width: ${width(props.type, props.multiplier)};
        `
    }
`;


const Spacing = ({ type, multiplier }: SpacingProps) => {
    return (
        <>
            <code>
                <pre>
// Using TS Width Utility <br />
                    {"const Container = styled.div`"}<br />
                    {`     gap: \${width(${type}${multiplier === undefined ? "" : `, ${multiplier}`})};`}<br />
                    {"`;"}<br /><br />

// Using CSS <br />
                    {".container {"}<br />
                    {`     gap: ${width(type, multiplier)};`} <br />
                    {"}"}<br /><br />
                </pre>

            </code>
            <Example type={type} multiplier={multiplier} />
        </>
    )

};

const meta: Meta<typeof Spacing> = {
    title: "Quarks/Spacing",
    component: Spacing,
    tags: ["autodocs"],
    args: {
        type: "gutter",
        multiplier: undefined,
    },
    argTypes: {
        type: {
            control: "select",
            options: LayoutWidthsSchema.options,
            // description: "Native button type attribute",
        },
        multiplier: {
            control: "number"
        }
    },
    parameters: {
        layout: "padded",
        docs: {
            description: {
                component: "Craftsman comes out of the box with spacing declarations that have been time-tested over decades of building enterprise-grade applications. We offer both CSS variables (prefixed with --w-) as well as a Typescript utility comes strictly typed to make your implementation code easy to use.<br /><br /> As you can see in the example, CSS is very doable, but the Typescript utility makes implementation very simple.",
            },
            source: {
                transform: (_src: string, context: { args?: { type?: LayoutWidthsType; multiplier?: number } }) => {
                    const { type = "gutter", multiplier } = context.args ?? {};
                    return `import { width } from "@stamcat/craftsman/styles";

const space = ${multiplier ? `width("${type}", ${multiplier});` : `width("${type}");`}
`;
                },
            },
        },
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Primary: Story = {
    args: {
        type: "column",
        multiplier: 2,
    },
};

