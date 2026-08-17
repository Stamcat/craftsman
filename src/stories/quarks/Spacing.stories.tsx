import type { Meta, StoryObj } from "@storybook/react-vite";

import { LayoutWidthsSchema, type LayoutWidthsType } from "../../utilities/types";
import { width, breakpoint, media } from "../../styles/utilities/layout";
import { color } from "../../styles";

type SpacingProps = {
    type: LayoutWidthsType;
    multiplier?: number;
};

const Example = ({ type, multiplier }: SpacingProps) => (
    <div
        style={{
            marginTop: width("gutter"),
            height: "50px",
            backgroundColor: color("purple300"),
            width: width(type, multiplier),
        }}
    />
);


const Spacing = ({ type, multiplier }: SpacingProps) => {
    return (
        <>
            <code>
                <pre>
// Using TS Width Utility <br />
                    {"const Container = styled.div`"}<br />
                    {`     gap: \${width(${type}${multiplier === undefined ? "" : `, ${multiplier}`})};`}<br />
                    {"`;"}<br /><br />
// Using SCSS width function<br />
                    {".container {"}<br />
                    {"     gap: #{u.width(gutter)};"}
                    {"}"}<br /><br />

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

export const SassWidthFunction: Story = {
    name: "Sass width()",
    parameters: {
        docs: {
            description: {
                story: `The \`width()\` Sass function produces the same values as the TypeScript utility, keeping stylesheet and component code consistent.

- **\`width(name)\`** — returns the raw CSS variable: \`var(--w-gutter)\`
- **\`width(name, multiplier)\`** — returns a \`calc()\` expression scaled by the multiplier
- **\`width-var(name)\`** — returns only the variable reference with no calc wrapper (useful inside other expressions)

\`\`\`scss
@use "@stamcat/craftsman/styles/utilities/_functions" as u;

.card {
  padding: #{u.width(gutter)};
  gap: #{u.width(gutter, 0.5)};
  max-width: #{u.width(column, 4)};
}
\`\`\`

Valid keys: \`text\` · \`gutter\` · \`column\` · \`tablet\` · \`desktop\` · \`extDesktop\` · \`mobileMax\` · \`tabletMax\` · \`desktopMax\``,
            },
            source: {
                code: `@use "@stamcat/craftsman/styles/utilities/_functions" as u;

.layout {
  // Single unit
  padding: #{u.width(gutter)};

  // Fractional — half a gutter
  gap: #{u.width(gutter, 0.5)};

  // Multi-column with auto gutters
  max-width: #{u.width(column, 3)};
}`,
                language: "scss",
            },
        },
    },
    render: ({ type, multiplier }) => {
        const single = width(type);
        const scaled = multiplier !== undefined ? width(type, multiplier) : null;

        const rowStyle: React.CSSProperties = { padding: "4px 8px" };
        const thStyle: React.CSSProperties = { textAlign: "left", padding: "4px 8px", borderBottom: "1px solid #e5e7eb" };

        return (
            <section style={{ border: "1px solid #d1d5db", borderRadius: "8px", padding: width("gutter", 0.5), display: "grid", gap: width("gutter", 0.5) }}>
                <h3>Sass width(name, multiplier?)</h3>
                <table style={{ borderCollapse: "collapse", width: "100%", fontSize: "13px" }}>
                    <thead>
                        <tr>
                            <th style={thStyle}>Call</th>
                            <th style={thStyle}>Output</th>
                            <th style={thStyle}>Preview</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style={rowStyle}><code>{`#{u.width(${type})}`}</code></td>
                            <td style={rowStyle}><code>{single}</code></td>
                            <td style={rowStyle}>
                                <div style={{ height: 24, borderRadius: 4, backgroundColor: color("purple300"), width: single }} />
                            </td>
                        </tr>
                        {scaled !== null && (
                            <tr>
                                <td style={rowStyle}><code>{`#{u.width(${type}, ${multiplier})}`}</code></td>
                                <td style={rowStyle}><code>{scaled}</code></td>
                                <td style={rowStyle}>
                                    <div style={{ height: 24, borderRadius: 4, backgroundColor: color("purple500"), width: scaled }} />
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </section>
        );
    },
};

const thStyle: React.CSSProperties = { textAlign: "left", padding: "4px 8px", borderBottom: "1px solid #e5e7eb", fontSize: "13px" };
const tdStyle: React.CSSProperties = { padding: "4px 8px", fontSize: "13px" };
const sectionStyle: React.CSSProperties = { border: "1px solid #d1d5db", borderRadius: "8px", padding: width("gutter", 0.5), display: "grid", gap: width("gutter", 0.5) };

type BreakpointKey = keyof typeof media;
const breakpointKeys = ["tablet", "tabletMax", "tabletOnly", "desktop", "desktopMax", "desktopOnly", "extDesktop", "mobileMax", "mobileOnly", "mobileTablet"] as BreakpointKey[];

export const BreakpointUtility: Story = {
    name: "breakpoint()",
    parameters: {
        docs: {
            description: {
                story: `Both a **TypeScript function** and a **Sass mixin** are available, and they resolve to the same \`@media\` queries so inline styles and stylesheets stay in sync.

**TypeScript** — \`breakpoint(bp, styles)\` returns a raw \`@media ...\` string for use in CSS-in-JS or inline \`<style>\` injection:

\`\`\`ts
import { breakpoint } from "@stamcat/craftsman/styles";

// CSS-in-JS (e.g. styled-components template literal)
const Card = styled.div\`
  font-size: 14px;
  \${breakpoint("desktop", "font-size: 18px;")}
\`;
\`\`\`

**Sass** — \`@include breakpoint(bp)\` wraps a block in the correct \`@media\` query:

\`\`\`scss
@use "@stamcat/craftsman/styles/utilities/_functions" as u;

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
                code: `import { breakpoint, media } from "@stamcat/craftsman/styles";

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

        return (
            <section style={sectionStyle}>
                <h3>breakpoint(bp) — TypeScript &amp; Sass</h3>
                <code><pre>{`import { breakpoint, media } from "@stamcat/craftsman/styles";

const rule = breakpoint("desktop", "font-size: 18px;");
// => "@media (min-width: 1040px) { font-size: 18px; }"`}</pre></code>
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

