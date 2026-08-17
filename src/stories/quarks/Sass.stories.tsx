import type { Meta, StoryObj } from "@storybook/react-vite";
import { color } from "../../styles";
import { width } from "../../styles/utilities/layout";

const meta: Meta = {
    title: "Quarks/Sass",
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
@use "@stamcat/craftsman/styles/config" with (
  $w-text:        14,
  $w-gutter:      16,
  $w-column:      60,

  $bp-mobileMax:  659.99999,
  $bp-tablet:     660,
  $bp-tabletMax:  1039.99999,
  $bp-desktop:    1040,
  $bp-desktopMax: 1319.99999,
  $bp-extDesktop: 1320,
);

// 2. Then import global styles (they will consume the overridden config)
@use "@stamcat/craftsman/styles/global/globalStyles";`,
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
                code: `@use "@stamcat/craftsman/styles/utilities/_functions" as u;

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
                <pre style={codeBlockStyle}>{`@use "@stamcat/craftsman/styles/utilities/_functions" as u;\n\n.element {\n  color:      #{u.color(blue500)};\n  background: #{u.color(black, rgba, 0.4)};\n}`}</pre>
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
    name: "width(name, multiplier?)",
    parameters: {
        docs: {
            description: {
                story: `Produces spacing and layout values from the configured scale. All values resolve to CSS variable expressions so they respond to runtime theme overrides.

| Signature | Returns |
|---|---|
| \`width(gutter)\` | \`var(--w-gutter)\` |
| \`width(gutter, 0.5)\` | \`calc(var(--w-gutter) * 0.5)\` |
| \`width(column, 3)\` | \`calc((var(--w-column) * 3) + (var(--w-gutter) * 2))\` |

The \`column\` key automatically accounts for gutters between columns.

Valid keys: \`text\` · \`gutter\` · \`column\` · \`tablet\` · \`desktop\` · \`extDesktop\` · \`mobileMax\` · \`tabletMax\` · \`desktopMax\``,
            },
            source: {
                code: `@use "@stamcat/craftsman/styles/utilities/_functions" as u;

.card {
  padding:   #{u.width(gutter)};
  gap:       #{u.width(gutter, 0.5)};
  max-width: #{u.width(column, 4)};
}`,
                language: "scss",
            },
        },
    },
    render: () => {
        const examples: Array<{ call: string; value: string; isLayout: boolean }> = [
            { call: 'width("gutter")',       value: width("gutter"),       isLayout: false },
            { call: 'width("gutter", 0.5)',  value: width("gutter", 0.5),  isLayout: false },
            { call: 'width("gutter", 2)',    value: width("gutter", 2),    isLayout: false },
            { call: 'width("text")',         value: width("text"),         isLayout: false },
            { call: 'width("column", 1)',    value: width("column", 1),    isLayout: true },
            { call: 'width("column", 3)',    value: width("column", 3),    isLayout: true },
        ];

        return (
            <section style={sectionStyle}>
                <h3>width(name, multiplier?)</h3>
                <pre style={codeBlockStyle}>{`@use "@stamcat/craftsman/styles/utilities/_functions" as u;\n\n.card {\n  padding:   #{u.width(gutter)};\n  gap:       #{u.width(gutter, 0.5)};\n  max-width: #{u.width(column, 4)};\n}`}</pre>
                <table style={{ borderCollapse: "collapse", width: "100%", fontSize: "13px" }}>
                    <thead>
                        <tr>
                            <th style={thStyle}>Sass call</th>
                            <th style={thStyle}>Resolved value</th>
                            <th style={thStyle}>Preview</th>
                        </tr>
                    </thead>
                    <tbody>
                        {examples.map(({ call, value, isLayout }) => (
                            <tr key={call}>
                                <td style={tdStyle}><code>{`#{u.${call}}`}</code></td>
                                <td style={tdStyle}><code>{value}</code></td>
                                <td style={tdStyle}>
                                    <div style={{
                                        height: isLayout ? 20 : 12,
                                        borderRadius: 3,
                                        background: color(isLayout ? "purple400" : "blue400"),
                                        width: value,
                                        maxWidth: "100%",
                                    }} />
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
                code: `@use "@stamcat/craftsman/styles/utilities/_functions" as u;

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
                <pre style={codeBlockStyle}>{`@use "@stamcat/craftsman/styles/utilities/_functions" as u;\n\n.sidebar {\n  display: none;\n\n  @include u.breakpoint(tablet) {\n    display: block;\n  }\n}`}</pre>
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
