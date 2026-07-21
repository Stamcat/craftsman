import type { Meta, StoryObj } from "@storybook/react-vite";
import styled from "@emotion/styled";
import { colors } from "../../styles/utilities/color";
import { width } from "../../styles/utilities/layout";
import { css } from "@emotion/react";
import { toast, ToastContainer } from "react-toastify";
import { Button } from "../../components";

const meta: Meta = {
    title: "Quarks/Colors",
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
`;

const Group = styled.section`
    display: grid;
    gap: ${width("gutter", 0.25)};
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
                    <Group key={group.key}>
                        <GroupGrid>
                            {group.items.map(([name, value]) => (
                                <Swatch key={name} name={name} value={value} />
                            ))}
                        </GroupGrid>
                    </Group>
                ))}
                <ToastContainer />
            </Page>
        );
    },
};
