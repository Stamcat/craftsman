import type { Meta, StoryObj } from "@storybook/react-vite";
import styled from "@emotion/styled";
import { color, colors, hexToRgba, type ColorKey } from "../../styles/utilities/color";
import { width } from "../../styles/utilities/layout";
import { css } from "@emotion/react";
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

const Page = styled.div`
    display: grid;
    gap: ${width("gutter")};
    section {
        display: grid;
        gap: ${width("gutter", 0.25)};
    }
`;


const GroupGrid = styled.div`
    display: inline-flex;
    flex-flow: row wrap;
    gap: ${width("gutter", 0.5)};
`;

const Card = styled.div`
    border: 1px solid #d1d5db;
    border-radius: 8px;
    overflow: hidden;
    background: #fff;
    width: ${width("column", 1.5)};

    footer {
        padding: 0 ${width("gutter", 0.25)};
    }
`;

const SwatchPreview = styled.div<{ color: string }>`
    height: ${width("column")};
    ${(props) => css`
        background-color: ${props.color};
    `}
`;

const UtilityCard = styled.section`
    border: 1px solid #d1d5db;
    border-radius: 8px;
    padding: ${width("gutter", 0.5)};
    display: grid;
    gap: ${width("gutter", 0.5)};
`;

const UtilitySwatch = styled.div<{ bg: string }>`
    height: 56px;
    border-radius: 6px;
    border: 1px solid #e5e7eb;
    background: ${(props) => props.bg};
`;

const copyToClipboard = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (navigator.clipboard?.writeText) {
        navigator.clipboard.writeText(e.currentTarget.value);
        toast(`"${e.currentTarget.value}" copied to clipboard!`);
    }
}
const Swatch = ({ name, value }: { name: string; value: string }) => {
    return (
        <Card>
            <SwatchPreview color={value} />
            <footer>
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
        </Card>
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
                        return `import styled from "@emotion/styled";
import { color } from "@stamcat/craftsman/styles";

const Container = styled.div\`
    background: \${color("${variable}")};
\`;`;
                    }

                    return `import styled from "@emotion/styled";
import { color } from "@stamcat/craftsman/styles";

const Container = styled.div\`
    background: \${color("${variable}", "rgba", ${alpha})};
\`;`;
                },
            },
        },
    },
    render: ({ variable, alpha, mode }) => {
        const result = mode === "hex" ? color(variable, "hex") : color(variable, "rgba", alpha);

        return (
            <UtilityCard>
                <h3>color(name, type, alpha)</h3>
                <code><pre>{`color("${variable}"${mode === "rgba" ? `, ${mode}` : ""}${mode === "rgba" ? `, ${alpha}` : ""}) => ${result}`}</pre></code>
                <UtilitySwatch bg={result} />
            </UtilityCard>
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

                    return `import styled from "@emotion/styled";
import { colors, hexToRgba } from "@stamcat/craftsman/styles";

const Container = styled.div\`
    background: \${hexToRgba(colors.${variable}, ${alpha})};
\`;`;
                },
            },
        },
    },
    render: ({ variable, alpha }) => {
        const hexValue = colors[variable];
        const result = hexToRgba(hexValue, alpha);

        return (
            <UtilityCard>
                <h3>hexToRgba(hex, alpha)</h3>
                <code><pre>{`hexToRgba(colors.${variable}, ${alpha}) => ${result}`}</pre></code>
                <UtilitySwatch bg={result} />
            </UtilityCard>
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
            <Page>
                {grouped.map((group) => (
                    <section key={group.key}>
                        <GroupGrid>
                            {group.items.map(([name, value]) => (
                                <Swatch key={name} name={name} value={value} />
                            ))}
                        </GroupGrid>
                    </section>
                ))}
                <ToastContainer />
            </Page>
        );
    },
};

