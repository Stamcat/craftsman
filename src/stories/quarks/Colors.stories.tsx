import type { Meta, StoryObj } from "@storybook/react-vite";
import { color, colors, hexToRgba, type ColorKey } from "../../styles/utilities/color";
import { width } from "../../styles/utilities/layout";
import { toast, ToastContainer } from "react-toastify";
import { Button } from "../../components";

const colorOptions = Object.keys(colors) as ColorKey[];

type StoryArgs = {
    variable: ColorKey;
    alpha: number;
    mode: "hex" | "rgba";
};

const meta: Meta<StoryArgs> = {
    title: "Quarks/Colors",
    tags: ["autodocs"],
    args: {
        variable: "purple500",
        alpha: 0.6,
        mode: "rgba",
    },
    argTypes: {
        variable: {
            control: "select",
            options: colorOptions,
        },
        alpha: {
            control: { type: "range", min: 0, max: 1, step: 0.05 },
            if: { arg: "mode", eq: "rgba" },
        },
        mode: {
            control: "radio",
            options: ["hex", "rgba"],
        },
    },
    parameters: {
        layout: "padded",
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

const pageStyle: React.CSSProperties = {
    display: "grid",
    gap: width("gutter"),
};

const sectionStyle: React.CSSProperties = {
    display: "grid",
    gap: width("gutter", 0.25),
};

const groupGridStyle: React.CSSProperties = {
    display: "inline-flex",
    flexFlow: "row wrap",
    gap: width("gutter", 0.5),
};

const cardStyle: React.CSSProperties = {
    border: "1px solid #d1d5db",
    borderRadius: "8px",
    overflow: "hidden",
    background: "#fff",
    width: width("column", 1.5),
};

const utilityCardStyle: React.CSSProperties = {
    border: "1px solid #d1d5db",
    borderRadius: "8px",
    padding: width("gutter", 0.5),
    display: "grid",
    gap: width("gutter", 0.5),
};

const copyToClipboard = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (navigator.clipboard?.writeText) {
        navigator.clipboard.writeText(e.currentTarget.value);
        toast(`"${e.currentTarget.value}" copied to clipboard!`);
    }
}
const Swatch = ({ name, value }: { name: string; value: string }) => {
    return (
        <div style={cardStyle}>
            <div style={{ height: width("column"), backgroundColor: value }} />
            <footer style={{ padding: `0 ${width("gutter", 0.25)}` }}>
                <p>
                    <Button
                        variant="text"
                        onClick={copyToClipboard}
                        value={name}
                        aria-label={`Copy token name ${name}`}
                    >
                        <strong><small>{name}</small></strong>
                    </Button>
                </p>
                <Button
                    variant="text"
                    value={value}
                    onClick={copyToClipboard}
                    aria-label={`Copy token value ${value}`}
                >
                    <small>{value}</small>
                </Button>
            </footer>
        </div>
    );
}
export const ColorFunction: Story = {
    name: "color()",
    parameters: {
        docs: {
            description: {
                story: "The color utility is very powerful because unlike CSS variables, it brings type safety to the entire color palette. When using standard hex colors, it will return a css variable (for ease of theming). Color also includes an rgba conversion utility that allows you to easily convert a typesafe color to RGBA and then tune its opacity.",
            },
            source: {
                transform: (_src: string, context: { args?: Partial<StoryArgs> }) => {
                    const variable = context.args?.variable ?? "purple500";
                    const mode = context.args?.mode ?? "rgba";
                    const alpha = context.args?.alpha ?? 0.6;

                    if (mode === "hex") {
                        return `import { color } from "@stamcat/craftsman/styles";

const style = {
    background: color("${variable}"),
};`;
                    }

                    return `import { color } from "@stamcat/craftsman/styles";

const style = {
    background: color("${variable}", "rgba", ${alpha}),
};`;
                },
            },
        },
    },
    render: ({ variable, alpha, mode }) => {
        const result = mode === "hex" ? color(variable, "hex") : color(variable, "rgba", alpha);

        return (
            <section style={utilityCardStyle}>
                <h3>color(name, type, alpha)</h3>
                <code><pre>{`color("${variable}"${mode === "rgba" ? `, ${mode}` : ""}${mode === "rgba" ? `, ${alpha}` : ""}) => ${result}`}</pre></code>
                <div style={{ height: "56px", borderRadius: "6px", border: "1px solid #e5e7eb", background: result }} />
            </section>
        );
    },
};

export const hexToRgbaFunction: Story = {
    name: "hexToRgba()",
    args: {
        variable: "purple500",
        alpha: 0.35,
    },
    argTypes: {
        variable: {
            control: "select",
            options: colorOptions,
        },
        mode: { table: { disable: true } },
    },
    parameters: {
        docs: {
            description: {
                story: "`hexToRgba()` is an optional fallback utility for the rare cases where `rgba` from a CSS variable is not possible. Use it when you already have a literal hex value and need a stable rgba string.",
            },
            source: {
                transform: (_src: string, context: { args?: Partial<StoryArgs> }) => {
                    const variable = context.args?.variable ?? "purple500";
                    const alpha = context.args?.alpha ?? 0.35;

                    return `import { colors, hexToRgba } from "@stamcat/craftsman/styles";

const style = {
    background: hexToRgba(colors.${variable}, ${alpha}),
};`;
                },
            },
        },
    },
    render: ({ variable, alpha }) => {
        const hexValue = colors[variable];
        const result = hexToRgba(hexValue, alpha);

        return (
            <section style={utilityCardStyle}>
                <h3>hexToRgba(hex, alpha)</h3>
                <code><pre>{`hexToRgba(colors.${variable}, ${alpha}) => ${result}`}</pre></code>
                <div style={{ height: "56px", borderRadius: "6px", border: "1px solid #e5e7eb", background: result }} />
            </section>
        );
    },
};

export const SassColorFunction: Story = {
    name: "Sass color()",
    parameters: {
        docs: {
            description: {
                story: `The \`color()\` Sass function resolves a color variable reference for use inside stylesheets. It has two modes:

- **hex** (default) — returns the raw CSS variable: \`var(--blue500)\`
- **rgba** — returns a \`rgb(from ...)\` relative color expression for alpha control: \`rgb(from var(--blue500) r g b / 0.5)\`

Use this instead of hard-coding hex values so themes can override via \`--name\` variables.

\`\`\`scss
@use "@stamcat/craftsman/styles/utilities/functions" as u;

.element {
  // Hex — resolves to var(--blue500)
  color: #{u.color(blue500)};

  // RGBA — resolves to rgb(from var(--blue500) r g b / 0.5)
  background: #{u.color(blue500, rgba, 0.5)};
}
\`\`\`

> **Note:** The \`rgba\` mode uses the CSS relative color syntax (\`rgb(from ...)\`). Verify browser support requirements for your target audience.`,
            },
            source: {
                code: `@use "@stamcat/craftsman/styles/utilities/functions" as u;

.badge {
  color: #{u.color(white)};
  background: #{u.color(blue500)};
  border: 1px solid #{u.color(blue700)};
}

.overlay {
  background: #{u.color(black, rgba, 0.4)};
}`,
                language: "scss",
            },
        },
    },
    render: ({ variable, alpha }) => {
        const hexResult = color(variable, "hex");
        const rgbaResult = color(variable, "rgba", alpha);

        return (
            <section style={utilityCardStyle}>
                <h3>Sass color(name, type?, alpha?)</h3>
                <table style={{ borderCollapse: "collapse", width: "100%", fontSize: "13px" }}>
                    <thead>
                        <tr>
                            <th style={{ textAlign: "left", padding: "4px 8px", borderBottom: "1px solid #e5e7eb" }}>Call</th>
                            <th style={{ textAlign: "left", padding: "4px 8px", borderBottom: "1px solid #e5e7eb" }}>Output</th>
                            <th style={{ textAlign: "left", padding: "4px 8px", borderBottom: "1px solid #e5e7eb" }}>Preview</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style={{ padding: "4px 8px" }}><code>{`#{u.color(${variable})}`}</code></td>
                            <td style={{ padding: "4px 8px" }}><code>{hexResult}</code></td>
                            <td style={{ padding: "4px 8px" }}>
                                <div style={{ width: 32, height: 32, borderRadius: 4, border: "1px solid #e5e7eb", background: hexResult }} />
                            </td>
                        </tr>
                        <tr>
                            <td style={{ padding: "4px 8px" }}><code>{`#{u.color(${variable}, rgba, ${alpha})}`}</code></td>
                            <td style={{ padding: "4px 8px" }}><code>{rgbaResult}</code></td>
                            <td style={{ padding: "4px 8px" }}>
                                <div style={{ width: 32, height: 32, borderRadius: 4, border: "1px solid #e5e7eb", background: rgbaResult }} />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </section>
        );
    },
};

export const Palette: Story = {
    render: () => {
        const grouped = Object.entries(colors).reduce<Array<{ key: string; items: Array<[string, string]> }>>((acc, entry, index, list) => {
            const [name] = entry;
            const currentPrefix = name.slice(0, 3);
            const previousPrefix = index > 0 ? list[index - 1][0].slice(0, 3) : null;

            if (index === 0 || currentPrefix !== previousPrefix) {
                acc.push({ key: currentPrefix, items: [entry] });
                return acc;
            }

            acc[acc.length - 1].items.push(entry);
            return acc;
        }, []);

        return (
            <div style={pageStyle}>
                {grouped.map((group) => (
                    <section key={group.key} style={sectionStyle}>
                        <div style={groupGridStyle}>
                            {group.items.map(([name, value]) => (
                                <Swatch key={name} name={name} value={value} />
                            ))}
                        </div>
                    </section>
                ))}
                <ToastContainer />
            </div>
        );
    },
};

