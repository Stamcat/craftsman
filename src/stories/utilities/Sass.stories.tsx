import type { Meta, StoryObj } from "@storybook/react-vite";
import { color } from "../../styles";
import { width } from "../../styles/utilities/layout";
import { PACKAGE_NAME } from "../utilities/packageName";

const meta: Meta = {
    title: "Utilities/Sass",
    tags: ["autodocs"],
    parameters: { layout: "padded" },
};

export default meta;
type Story = StoryObj<typeof meta>;

const sectionStyle: React.CSSProperties = {
    border: "1px solid #d1d5db",
    borderRadius: "8px",
    padding: width("gutter"),
    display: "grid",
    gap: width("gutter", 0.5),
};

const codeBlockStyle: React.CSSProperties = {
    background: "#f6f8fa",
    border: "1px solid #e5e7eb",
    borderRadius: "6px",
    padding: `${width("gutter", 0.5)} ${width("gutter")}`,
    fontSize: "13px",
    overflowX: "auto",
};

const thStyle: React.CSSProperties = {
    textAlign: "left",
    padding: "4px 8px",
    borderBottom: "1px solid #e5e7eb",
    fontSize: "13px",
};

const tdStyle: React.CSSProperties = { padding: "4px 8px", fontSize: "13px" };

// ─── Config ──────────────────────────────────────────────────────────────────

export const Config: Story = {
    name: "Config & Variables",
    parameters: {
        docs: {
            description: {
                story: `\`_config.scss\` exposes every configurable Sass variable for the library. Load it **with** \`@use ... with (...)\` before any other craftsman stylesheet to override defaults.

All values are unitless numbers (px implied). Breakpoint variables are required to be static numbers because CSS custom properties cannot be used inside \`@media\` conditions.`,
            },
            source: {
                code: `// app/styles/craftsman.scss

// 1. Override config first — before any other craftsman import
@use "${PACKAGE_NAME}/styles/config" with (
  $w-text:        14,
  $w-gutter:      16,
  $w-column:      60,
  $root-font-size: 16,

  $bp-mobileMax:  659.99999,
  $bp-tablet:     660,
  $bp-tabletMax:  1039.99999,
  $bp-desktop:    1040,
  $bp-desktopMax: 1319.99999,
  $bp-extDesktop: 1320,
);

// 2. Then import global styles (they will consume the overridden config)
@use "${PACKAGE_NAME}/styles/global/globalStyles";`,
                language: "scss",
            },
        },
    },
    render: () => (
        <section style={sectionStyle}>
            <h3>Config variables</h3>
            <p style={{ fontSize: "14px", margin: 0 }}>
                Override any variable by forwarding <code>@use ... with (...)</code> before other craftsman imports.
                The table below lists every variable and its default value.
            </p>
            <table style={{ borderCollapse: "collapse", width: "100%", fontSize: "13px" }}>
                <thead>
                    <tr>
                        <th style={thStyle}>Variable</th>
                        <th style={thStyle}>Default</th>
                        <th style={thStyle}>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {[
                        ["$w-text", "14", "Base text size in px"],
                        ["$w-gutter", "16", "Base gutter / spacing unit in px"],
                        ["$w-column", "60", "Single column width in px"],
                        ["$root-font-size", "16", "Assumed root <html> font-size in px, used by width()'s rem/em unit conversion"],
                        ["$bp-mobileMax", "659.99999", "Max-width for mobile breakpoint"],
                        ["$bp-tablet", "660", "Min-width for tablet breakpoint"],
                        ["$bp-tabletMax", "1039.99999", "Max-width for tablet breakpoint"],
                        ["$bp-desktop", "1040", "Min-width for desktop breakpoint"],
                        ["$bp-desktopMax", "1319.99999", "Max-width for desktop breakpoint"],
                        ["$bp-extDesktop", "1320", "Min-width for extended desktop breakpoint"],
                    ].map(([variable, defaultVal, description]) => (
                        <tr key={variable}>
                            <td style={tdStyle}><code>{variable}</code></td>
                            <td style={tdStyle}><code>{defaultVal}</code></td>
                            <td style={tdStyle}>{description}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    ),
};

// ─── color() ─────────────────────────────────────────────────────────────────

export const ColorFunction: Story = {
    name: "color(name, type?, alpha?)",
    parameters: {
        docs: {
            description: {
                story: `Resolves a color from the palette as a CSS variable reference, keeping stylesheets themeable.

| Signature | Returns |
|---|---|
| \`color(blue500)\` | \`var(--blue500)\` |
| \`color(blue500, rgba, 0.5)\` | \`rgb(from var(--blue500) r g b / 0.5)\` |

The \`rgba\` mode uses the CSS relative color syntax. Prefer it over hard-coded \`rgba()\` values so theme overrides still apply.

> **Note:** \`rgb(from ...)\` requires a browser that supports the CSS relative color specification.`,
            },
            source: {
                code: `@use "${PACKAGE_NAME}/styles/utilities/functions" as u;

.badge {
  color:      #{u.color(white)};
  background: #{u.color(blue500)};
  border:     1px solid #{u.color(blue700)};
}

.overlay {
  background: #{u.color(black, rgba, 0.4)};
}`,
                language: "scss",
            },
        },
    },
    render: () => {
        const examples: Array<{ call: string; value: string }> = [
            { call: "color(blue500)",            value: color("blue500") },
            { call: "color(blue500, rgba, 0.5)", value: color("blue500", "rgba", 0.5) },
            { call: "color(red600)",             value: color("red600") },
            { call: "color(red600, rgba, 0.25)", value: color("red600", "rgba", 0.25) },
            { call: "color(green500)",           value: color("green500") },
        ];

        return (
            <section style={sectionStyle}>
                <h3>color(name, type?, alpha?)</h3>
                <pre style={codeBlockStyle}>{`@use "${PACKAGE_NAME}/styles/utilities/functions" as u;\n\n.element {\n  color:      #{u.color(blue500)};\n  background: #{u.color(black, rgba, 0.4)};\n}`}</pre>
                <table style={{ borderCollapse: "collapse", width: "100%", fontSize: "13px" }}>
                    <thead>
                        <tr>
                            <th style={thStyle}>Sass call</th>
                            <th style={thStyle}>Resolved value</th>
                            <th style={thStyle}>Preview</th>
                        </tr>
                    </thead>
                    <tbody>
                        {examples.map(({ call, value }) => (
                            <tr key={call}>
                                <td style={tdStyle}><code>{`#{u.${call}}`}</code></td>
                                <td style={tdStyle}><code>{value}</code></td>
                                <td style={tdStyle}>
                                    <div style={{ width: 32, height: 32, borderRadius: 4, border: "1px solid #e5e7eb", background: value }} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        );
    },
};

// ─── width() ─────────────────────────────────────────────────────────────────

export const WidthFunction: Story = {
    name: "width(name, multiplier?, unit?)",
    parameters: {
        docs: {
            description: {
                story: `Produces spacing and layout values from the configured scale. All values resolve to CSS variable expressions so they respond to runtime theme overrides.

| Signature | Returns |
|---|---|
| \`width(gutter)\` | \`var(--w-gutter)\` |
| \`width(gutter, 0.5)\` | \`calc(var(--w-gutter) * 0.5)\` |
| \`width(column, 3)\` | \`calc((var(--w-column) * 3) + (var(--w-gutter) * 2))\` |
| \`width(gutter, 1, rem)\` | \`calc((var(--w-gutter) / 1px) / 16 * 1rem)\` |
| \`width(gutter, 1, number)\` | \`calc(var(--w-gutter) / 1px)\` |

The \`column\` key automatically accounts for gutters between columns.

The third parameter, \`unit\`, defaults to \`"px"\` and also accepts \`"rem"\`, \`"em"\`, or \`"number"\` (a unitless value, e.g. for \`line-height\`). \`rem\`/\`em\` conversions assume a 16px root font-size, configurable via \`$root-font-size\` (Sass) / \`rootFontSize\` (TS).

Valid keys: \`text\` · \`gutter\` · \`column\` · \`tablet\` · \`desktop\` · \`extDesktop\` · \`mobileMax\` · \`tabletMax\` · \`desktopMax\` — plus any custom key registered via \`$extra-widths\` / \`CraftsmanCustomWidths\` (see "Registering custom width() keys" below).`,
            },
            source: {
                code: `@use "${PACKAGE_NAME}/styles/utilities/functions" as u;

.card {
  padding:     #{u.width(gutter)};
  gap:         #{u.width(gutter, 0.5)};
  max-width:   #{u.width(column, 4)};
  line-height: #{u.width(gutter, 1, rem)};
}`,
                language: "scss",
            },
        },
    },
    render: () => {
        const examples: Array<{ call: string; value: string; isLayout: boolean; preview: "width" | "lineHeight" }> = [
            { call: 'width("gutter")', value: width("gutter"), isLayout: false, preview: "width" },
            { call: 'width("gutter", 0.5)', value: width("gutter", 0.5), isLayout: false, preview: "width" },
            { call: 'width("gutter", 2)', value: width("gutter", 2), isLayout: false, preview: "width" },
            { call: 'width("text")', value: width("text"), isLayout: false, preview: "width" },
            { call: 'width("gutter", 1, "rem")', value: width("gutter", 1, "rem"), isLayout: false, preview: "width" },
            { call: 'width("gutter", 1, "number")', value: width("gutter", 1, "number"), isLayout: false, preview: "lineHeight" },
            { call: 'width("column", 1)', value: width("column", 1), isLayout: true, preview: "width" },
            { call: 'width("column", 3)', value: width("column", 3), isLayout: true, preview: "width" },
        ];

        return (
            <section style={sectionStyle}>
                <h3>width(name, multiplier?, unit?)</h3>
                <pre style={codeBlockStyle}>{`@use "${PACKAGE_NAME}/styles/utilities/functions" as u;\n\n.card {\n  padding:     #{u.width(gutter)};\n  gap:         #{u.width(gutter, 0.5)};\n  max-width:   #{u.width(column, 4)};\n  line-height: #{u.width(gutter, 1, rem)};\n}`}</pre>
                <p style={{ fontSize: "13px", margin: 0, color: "#6b7280" }}>
                    <code>unit: &quot;number&quot;</code> resolves to a unitless value — it has no length unit (px/rem/em) attached, so it can only be used directly with CSS properties that accept plain numbers, like <code>line-height</code>. To use it as a length (e.g. <code>width</code>), multiply it by a unit yourself: <code>calc(#{"{"}u.width(gutter, 1, number){"}"} * 1px)</code>.
                </p>
                <table style={{ borderCollapse: "collapse", width: "100%", fontSize: "13px" }}>
                    <thead>
                        <tr>
                            <th style={thStyle}>Sass call</th>
                            <th style={thStyle}>Resolved value</th>
                            <th style={thStyle}>Preview</th>
                        </tr>
                    </thead>
                    <tbody>
                        {examples.map(({ call, value, isLayout, preview }) => (
                            <tr key={call}>
                                <td style={tdStyle}><code>{`#{u.${call}}`}</code></td>
                                <td style={tdStyle}><code>{value}</code></td>
                                <td style={tdStyle}>
                                    {preview === "lineHeight" ? (
                                        <div style={{ fontSize: "11px", lineHeight: value, maxHeight: 32, overflow: "hidden" }}>
                                            Unitless value used as line-height — wrap in your own text to see line spacing change.
                                        </div>
                                    ) : (
                                            <div style={{
                                                height: isLayout ? 20 : 12,
                                                borderRadius: 3,
                                                background: color(isLayout ? "purple400" : "blue400"),
                                                width: value,
                                                maxWidth: "100%",
                                            }} />
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        );
    },
};

// ─── breakpoint() ────────────────────────────────────────────────────────────

export const BreakpointMixin: Story = {
    name: "breakpoint(bp)",
    parameters: {
        docs: {
            description: {
                story: `The \`breakpoint()\` mixin wraps content in the correct \`@media\` query for the named breakpoint. Breakpoint values come from \`_config.scss\` so they stay in sync with any overrides.

| Key | Query type | Default range |
|---|---|---|
| \`mobile\` | min-width | ≥ 0px |
| \`mobileMax\` | max-width | ≤ 659px |
| \`mobileOnly\` | range | 0 – 659px |
| \`tablet\` | min-width | ≥ 660px |
| \`tabletMax\` | max-width | ≤ 1039px |
| \`tabletOnly\` | range | 660 – 1039px |
| \`mobileTablet\` | range | 0 – 1039px |
| \`desktop\` | min-width | ≥ 1040px |
| \`desktopMax\` | max-width | ≤ 1319px |
| \`desktopOnly\` | range | 1040 – 1319px |
| \`extDesktop\` | min-width | ≥ 1320px |`,
            },
            source: {
                code: `@use "${PACKAGE_NAME}/styles/utilities/functions" as u;

.sidebar {
  display: none;

  @include u.breakpoint(tablet) {
    display: block;
    width: #{u.width(column, 2)};
  }
}

.hero-text {
  font-size: #{u.width(text)};

  @include u.breakpoint(desktop) {
    font-size: #{u.width(text, 1.5)};
  }
}`,
                language: "scss",
            },
        },
    },
    render: () => {
        const breakpoints: Array<{ key: string; query: string }> = [
            { key: "mobile",      query: "(min-width: 0px)" },
            { key: "mobileMax",   query: "(max-width: 659.99999px)" },
            { key: "mobileOnly",  query: "(min-width: 0px) and (max-width: 659.99999px)" },
            { key: "tablet",      query: "(min-width: 660px)" },
            { key: "tabletMax",   query: "(max-width: 1039.99999px)" },
            { key: "tabletOnly",  query: "(min-width: 660px) and (max-width: 1039.99999px)" },
            { key: "mobileTablet",query: "(min-width: 0px) and (max-width: 1039.99999px)" },
            { key: "desktop",     query: "(min-width: 1040px)" },
            { key: "desktopMax",  query: "(max-width: 1319.99999px)" },
            { key: "desktopOnly", query: "(min-width: 1040px) and (max-width: 1319.99999px)" },
            { key: "extDesktop",  query: "(min-width: 1320px)" },
        ];

        return (
            <section style={sectionStyle}>
                <h3>@include breakpoint(key)</h3>
                <pre style={codeBlockStyle}>{`@use "${PACKAGE_NAME}/styles/utilities/functions" as u;\n\n.sidebar {\n  display: none;\n\n  @include u.breakpoint(tablet) {\n    display: block;\n  }\n}`}</pre>
                <table style={{ borderCollapse: "collapse", width: "100%", fontSize: "13px" }}>
                    <thead>
                        <tr>
                            <th style={thStyle}>Key</th>
                            <th style={thStyle}>Resolved @media query</th>
                        </tr>
                    </thead>
                    <tbody>
                        {breakpoints.map(({ key, query }) => (
                            <tr key={key}>
                                <td style={tdStyle}><code>{key}</code></td>
                                <td style={tdStyle}><code>@media {query}</code></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        );
    },
};

// ─── scale() ─────────────────────────────────────────────────────────────────

export const ScaleFunction: Story = {
    name: "scale(scaleName, key)",
    parameters: {
        docs: {
            description: {
                story: `\`scale()\` is the general plugin point for registering an entirely new utility function — shadow, radius, z-index, or anything else not already covered by \`width()\`/\`color()\` — without forking package source.

Unlike \`width()\`'s single fixed scale, \`scale()\` takes a scale name as its first argument, so one function covers any number of independently-registered scales. It is closed like \`width()\`: both the Sass \`$extra-scales\` map and the TS \`CraftsmanScales\` interface must register a scale name and its keys before they resolve — see "Registering a custom scale()" below.`,
            },
            source: {
                code: `@use "${PACKAGE_NAME}/styles/utilities/functions" as u;

.card {
  box-shadow: #{u.scale(shadow, sm)};
}`,
                language: "scss",
            },
        },
    },
    render: () => (
        <section style={sectionStyle}>
            <h3>scale(scaleName, key)</h3>
            <pre style={codeBlockStyle}>{`@use "${PACKAGE_NAME}/styles/utilities/functions" as u;\n\n.card {\n  box-shadow: #{u.scale(shadow, sm)};\n}`}</pre>
            <table style={{ borderCollapse: "collapse", width: "100%", fontSize: "13px" }}>
                <thead>
                    <tr>
                        <th style={thStyle}>Sass call</th>
                        <th style={thStyle}>Resolved value</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style={tdStyle}><code>{"#{u.scale(shadow, sm)}"}</code></td>
                        <td style={tdStyle}><code>var(--shadow-sm)</code></td>
                    </tr>
                </tbody>
            </table>
            <p style={{ fontSize: "13px", margin: 0, color: "#6b7280" }}>
                <code>shadow</code>/<code>sm</code> above are not built in — registering them is the subject of the next story.
            </p>
        </section>
    ),
};

// ─── Custom width keys ───────────────────────────────────────────────────────

export const CustomWidthKeys: Story = {
    name: "Registering custom width() keys",
    parameters: {
        docs: {
            description: {
                story: `\`color()\` already accepts any string (it only ever emits \`var(--name)\`, never validated) — a custom color just needs its own \`--name\` CSS variable supplied via \`theme.root\`.

\`width()\` is the one closed authoring function: both the Sass \`width-var()\` map and the TS \`LayoutWidthsType\` union only recognize the built-in keys (\`text\`, \`gutter\`, \`column\`, breakpoints). Registering a new key needs **two** additive steps — one per language — neither of which forks package source.`,
            },
            source: {
                code: `// 1. Sass — merge a new key into the config before any other craftsman import
@use "${PACKAGE_NAME}/styles/utilities/functions" as u with (
  $extra-widths: (sidebar: 280)
);

.layout {
  // width(sidebar) now resolves to var(--w-sidebar) instead of erroring
  grid-template-columns: #{u.width(sidebar)} 1fr;
}

// 2. TypeScript — declaration-merge the key onto CraftsmanCustomWidths for full type safety
declare module "${PACKAGE_NAME}/styles" {
  interface CraftsmanCustomWidths {
    sidebar: true;
  }
}

// 3. Set the actual px value at runtime via ThemeProvider — same mechanism as any other width override
<ThemeProvider theme={{ widths: { sidebar: 280 } }} />`,
                language: "tsx",
            },
        },
    },
    render: () => (
        <section style={sectionStyle}>
            <h3>Registering a custom width() key</h3>
            <p style={{ fontSize: "14px", margin: 0 }}>
                No package fork required — three additive steps register a brand-new <code>width()</code> key with full
                type safety on both the Sass and TypeScript sides.
            </p>
            <table style={{ borderCollapse: "collapse", width: "100%", fontSize: "13px" }}>
                <thead>
                    <tr>
                        <th style={thStyle}>Step</th>
                        <th style={thStyle}>Where</th>
                        <th style={thStyle}>What</th>
                    </tr>
                </thead>
                <tbody>
                    {[
                        ["1", "Sass", "@use \u2026 with ($extra-widths: (sidebar: 280)) before any other craftsman import"],
                        ["2", "TypeScript", "declare module \"@stamcat/craftsman/styles\" { interface CraftsmanCustomWidths { sidebar: true } }"],
                        ["3", "Runtime", "<ThemeProvider theme={{ widths: { sidebar: 280 } }} /> sets the actual --w-sidebar value"],
                    ].map(([step, where, what]) => (
                        <tr key={step}>
                            <td style={tdStyle}>{step}</td>
                            <td style={tdStyle}><code>{where}</code></td>
                            <td style={tdStyle}>{what}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <p style={{ fontSize: "14px", margin: 0 }}>
                <code>color()</code> needs no equivalent mechanism — it never validates its key, so any string already
                works; just supply the matching <code>--name</code> variable via <code>theme.root</code>.
            </p>
        </section>
    ),
};

// ─── Custom scale() ──────────────────────────────────────────────────────────

export const CustomScale: Story = {
    name: "Registering a custom scale()",
    parameters: {
        docs: {
            description: {
                story: `\`width()\` and \`color()\` are the two utility functions craftsman ships. \`scale()\` is the general plugin point for registering a brand-new one — shadow, radius, z-index, or anything else — without forking package source. One \`scale()\` function covers any number of independently-registered scales, each identified by name.

Registering a new scale needs **three** additive steps, the same shape as registering a custom \`width()\` key.`,
            },
            source: {
                code: `// 1. Sass — register the scale and its keys before any other craftsman import
@use "${PACKAGE_NAME}/styles/utilities/functions" as u with (
  $extra-scales: (shadow: (sm: true, md: true))
);

.card {
  // scale(shadow, sm) now resolves to var(--shadow-sm) instead of erroring
  box-shadow: #{u.scale(shadow, sm)};
}

// 2. TypeScript — declaration-merge the scale and its keys onto CraftsmanScales for full type safety
declare module "${PACKAGE_NAME}/styles" {
  interface CraftsmanScales {
    shadow: "sm" | "md";
  }
}

// 3. Set the actual CSS values at runtime via ThemeProvider
<ThemeProvider theme={{ scales: { shadow: { sm: "0 1px 2px rgb(0 0 0 / 0.1)", md: "0 4px 8px rgb(0 0 0 / 0.15)" } } }} />`,
                language: "tsx",
            },
        },
    },
    render: () => (
        <section style={sectionStyle}>
            <h3>Registering a custom scale()</h3>
            <p style={{ fontSize: "14px", margin: 0 }}>
                No package fork required — three additive steps register an entirely new <code>scale()</code> with full
                type safety on both the Sass and TypeScript sides.
            </p>
            <table style={{ borderCollapse: "collapse", width: "100%", fontSize: "13px" }}>
                <thead>
                    <tr>
                        <th style={thStyle}>Step</th>
                        <th style={thStyle}>Where</th>
                        <th style={thStyle}>What</th>
                    </tr>
                </thead>
                <tbody>
                    {[
                        ["1", "Sass", "@use \u2026 with ($extra-scales: (shadow: (sm: true, md: true))) before any other craftsman import"],
                        ["2", "TypeScript", "declare module \"@stamcat/craftsman/styles\" { interface CraftsmanScales { shadow: \"sm\" | \"md\" } }"],
                        ["3", "Runtime", "<ThemeProvider theme={{ scales: { shadow: { sm: \"...\" } } }} /> sets the actual --shadow-sm value"],
                    ].map(([step, where, what]) => (
                        <tr key={step}>
                            <td style={tdStyle}>{step}</td>
                            <td style={tdStyle}><code>{where}</code></td>
                            <td style={tdStyle}>{what}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <p style={{ fontSize: "14px", margin: 0 }}>
                Unlike <code>width()</code> (one fixed scale extended with new keys), <code>scale()</code> lets a
                consuming app register as many independent named scales as it needs — <code>shadow</code>,{" "}
                <code>radius</code>, <code>zIndex</code>, etc. — each validated the same way.
            </p>
        </section>
    ),
};
