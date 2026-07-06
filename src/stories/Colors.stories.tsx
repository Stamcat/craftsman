import type { Meta, StoryObj } from "@storybook/react-vite";
import styled from "@emotion/styled";
import { colors } from "../styles/utilities/color";
import { width } from "../styles/utilities/layout";
import { css } from "@emotion/react";
import { toast, ToastContainer } from "react-toastify";

const meta: Meta = {
    title: "Foundations/Colors",
    tags: ["autodocs"],
    parameters: {
        layout: "padded",
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

const Page = styled.div`
    display: inline-flex;
    flex-flow: row wrap;
    gap: ${width("gutter")};
`;

const Card = styled.div`
    border: 1px solid #d1d5db;
    border-radius: 8px;
    overflow: hidden;
    background: #fff;
    width: ${width("column", 2)};

    footer {
        padding: ${width("gutter", 0.5)};
    }
`;

const SwatchPreview = styled.div<{ color: string }>`
    height: 72px;
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
                    <button
                        type="button"
                        onClick={copyToClipboard}
                        value={name}
                        aria-label={`Copy token name ${name}`}
                    >
                        <strong>{name}</strong>
                    </button>
                </p>
                <button
                    type="button"
                    value={value}
                    onClick={copyToClipboard}
                    aria-label={`Copy token value ${value}`}
                >
                    {value}
                </button>
            </footer>
        </Card>
    );
}

export const Palette: Story = {
    render: () => (
        <Page>
            {Object.entries(colors).map(([name, value]) => ( 
                <Swatch key={name} name={name} value={value} />
            ))}
            <ToastContainer />
        </Page>
    ),
};
