import type { Meta, StoryObj } from "@storybook/react-vite";

import { LayoutWidthsSchema, type LayoutWidthsType } from "../../utilities/types";
import { width, breakpoint, media, type WidthUnit } from "../../styles/utilities/layout";
import { color } from "../../styles";
import { PACKAGE_NAME } from "../utilities/packageName";

type SpacingProps = {
    type: LayoutWidthsType;
    multiplier?: number;
    unit?: WidthUnit;
};
const thStyle: React.CSSProperties = { textAlign: "left", padding: "4px 8px", borderBottom: "1px solid #e5e7eb", fontSize: "13px" };
const tdStyle: React.CSSProperties = { padding: "4px 8px", fontSize: "13px" };
const sectionStyle: React.CSSProperties = { border: "1px solid #d1d5db", borderRadius: "8px", padding: width("gutter", 0.5), display: "grid", gap: width("gutter", 0.5) };

type BreakpointKey = keyof typeof media;
const breakpointKeys = ["tablet", "tabletMax", "tabletOnly", "desktop", "desktopMax", "desktopOnly", "extDesktop", "mobileMax", "mobileOnly", "mobileTablet"] as BreakpointKey[];

const Example = ({ type, multiplier, unit }: SpacingProps) => (
    <div
        style={{
            marginTop: width("gutter"),
            height: "50px",
            backgroundColor: color("purple300"),
            width: width(type, multiplier, unit),
        }}
    />
);


const Spacing = ({ type, multiplier, unit }: SpacingProps) => {
    const tsArgParts = [type, multiplier === undefined ? undefined : `${multiplier}`, unit === undefined ? undefined : `"${unit}"`].filter((part) => part !== undefined);
    const scssArgParts = [type, multiplier === undefined ? undefined : `${multiplier}`, unit].filter((part) => part !== undefined);
    const tsArgs = tsArgParts.join(", ");
    const scssArgs = scssArgParts.join(", ");

    return (
        <>
            <code>
                <pre>
                    // CSS-in-JS Using TS Width Utility <br />
                    {"const Container = styled.div`"}<br />
                    {`     gap: \${width(${tsArgs})};`}<br />
                    {"`;"}<br /><br />
                    // Using SCSS width function<br />
                    {".container {"}<br />
                    {`     gap: #{u.width(${scssArgs})};`}<br />
                    {"}"}<br /><br />

                    // Using CSS <br />
                    {".container {"}<br />
                    {`     gap: ${width(type, multiplier, unit)};`} <br />
                    {"}"}<br /><br />
                </pre>

            </code>
            <Example type={type} multiplier={multiplier} unit={unit} />
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
        unit: undefined,
    },
    argTypes: {
        type: {
            control: "select",
            options: LayoutWidthsSchema.options,
            // description: "Native button type attribute",
        },
        multiplier: {
            control: "number"
        },
        unit: {
            control: "select",
            options: ["px", "rem", "em", "number"],
        },
    },
    parameters: {
        layout: "padded",
        docs: {
            description: {
                component: "Craftsman comes out of the box with spacing declarations that have been time-tested over decades of building enterprise-grade applications. We offer CSS variables (prefixed with --w-), SASS Mixins AND Typescript utilities to make your implementation code easy to use.<br /><br /> As you can see in the example, CSS is very doable, but the Typescript utility makes implementation very simple.",
            },
            source: {
                transform: (_src: string, context: { args?: { type?: LayoutWidthsType; multiplier?: number; unit?: WidthUnit } }) => {
                    const { type = "gutter", multiplier, unit } = context.args ?? {};
                    const argParts = [`"${type}"`, multiplier === undefined ? undefined : `${multiplier}`, unit === undefined ? undefined : `"${unit}"`].filter((part) => part !== undefined);
                    const args = argParts.join(", ");
                    return `import { width } from "${PACKAGE_NAME}/styles";

const space = width(${args});
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

export const BreakpointUtility: Story = {
    name: "breakpoint()",
    parameters: {
        docs: {
            description: {
                story: `Both a **TypeScript function** and a **Sass mixin** are available, and they resolve to the same \`@media\` queries so inline styles and stylesheets stay in sync.

**TypeScript** — \`breakpoint(bp, styles)\` returns a raw \`@media ...\` string for use in CSS-in-JS or inline \`<style>\` injection:

\`\`\`ts
import { breakpoint } from "${PACKAGE_NAME}/styles";

// CSS-in-JS (e.g. styled-components template literal)
const Card = styled.div\`
  font-size: 14px;
  \${breakpoint("desktop", "font-size: 18px;")}
\`;
\`\`\`

**Sass** — \`@include breakpoint(bp)\` wraps a block in the correct \`@media\` query:

\`\`\`scss
@use "${PACKAGE_NAME}/styles/utilities/functions" as u;

.card {
  font-size: #{u.width(text)};

  @include u.breakpoint(desktop) {
    font-size: #{u.width(text, 1.25)};
  }
}
\`\`\`

The \`media\` object is also exported from TypeScript if you need the raw query string without wrapping styles.`,
            },
            source: {
                code: `import { breakpoint, media } from "${PACKAGE_NAME}/styles";

// Full @media rule string (CSS-in-JS)
const rule = breakpoint("desktop", "padding: 32px;");
// => "@media (min-width: 1040px) { padding: 32px; }"

// Raw query string only
const query = media.tablet;
// => "(min-width: 660px)"`,
                language: "ts",
            },
        },
    },
    render: () => {
        const examples: Array<{ call: string; result: string }> = [
            { call: `breakpoint("tablet", "display: block;")`, result: breakpoint("tablet", "display: block;") },
            { call: `breakpoint("desktop", "font-size: 18px;")`, result: breakpoint("desktop", "font-size: 18px;") },
            { call: `breakpoint("mobileMax", "flex-direction: column;")`, result: breakpoint("mobileMax", "flex-direction: column;") },
            { call: `breakpoint("tabletOnly", "padding: 24px;")`, result: breakpoint("tabletOnly", "padding: 24px;") },
        ];

        // the generated @media rule is injected as real CSS so resizing the viewport visibly flips the box
        const liveExampleClass = "spacing-breakpoint-live-example";
        const liveExampleStyles = `
.${liveExampleClass} {
    background-color: ${color("purple300")};
    padding: ${width("gutter")};
    border-radius: 6px;
    color: white;
    font-size: 13px;
    transition: background-color 0.2s ease;
}
${breakpoint("desktop", `.${liveExampleClass} { background-color: ${color("green300")}; }`)}
`;

        return (
            <section style={sectionStyle}>
                <h3>breakpoint(bp) — TypeScript &amp; Sass</h3>
                <code><pre>{`import { breakpoint, media } from "${PACKAGE_NAME}/styles";

const rule = breakpoint("desktop", "font-size: 18px;");
// => "@media (min-width: 1040px) { font-size: 18px; }"`}</pre></code>
                <h4 style={{ margin: 0 }}>Live example</h4>
                <style>{liveExampleStyles}</style>
                <div className={liveExampleClass}>
                    Resize the viewport — this box turns green at the &quot;desktop&quot; breakpoint (≥1040px).
                </div>
                <h4 style={{ margin: 0 }}>Live output</h4>
                <table style={{ borderCollapse: "collapse", width: "100%", fontSize: "13px" }}>
                    <thead>
                        <tr>
                            <th style={thStyle}>Call</th>
                            <th style={thStyle}>Returns</th>
                        </tr>
                    </thead>
                    <tbody>
                        {examples.map(({ call, result }) => (
                            <tr key={call}>
                                <td style={tdStyle}><code>{call}</code></td>
                                <td style={tdStyle}><code>{result}</code></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <h4 style={{ margin: 0 }}>All breakpoint keys</h4>
                <table style={{ borderCollapse: "collapse", width: "100%", fontSize: "13px" }}>
                    <thead>
                        <tr>
                            <th style={thStyle}>Key</th>
                            <th style={thStyle}>Resolved @media query</th>
                        </tr>
                    </thead>
                    <tbody>
                        {breakpointKeys.map((key) => (
                            <tr key={key}>
                                <td style={tdStyle}><code>{key}</code></td>
                                <td style={tdStyle}><code>@media {media[key]}</code></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        );
    },
};

