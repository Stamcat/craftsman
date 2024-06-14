import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import styled, { css } from "styled-components";
import { color, colors } from "../../utilities/colors";
import { gutter } from "../../utilities/layout";
import { NotificationPanel } from "../../components/NotificationPanel";
import { Notification } from "../../components/Notification";
import { Text } from "../../components/Text";

// TODO: Move this to components because it will be cool.
const Gallery = styled.section`
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
`;
const GalleryFigure = styled.figure`
    padding: ${gutter()};
    margin: 0;
    width: 130px;
    background: ${color("white")};
    display: inline-flex;
    flex-flow: row wrap;
    justify-content: center;
`;
const getSwatchColor = (swatch: string) => {
    return css`
        background-color: ${color(swatch)};
    `;
};
const Swatch = styled.div<{ $swatchColor: string }>`
    ${(props) => props.$swatchColor && getSwatchColor(props.$swatchColor)}
    margin-bottom: ${gutter(0.5)};
    display: inline-flex;
    flex-flow: row wrap;
    justify-content: center;
    border-radius: 4px;
    width: 100%;
    height: 80px;
`;
const GalleryCaption = styled.figcaption`
    text-align: center;
    width: 100%;
`;

class ColorLibrary extends React.PureComponent {
    readonly state = { copied: "", showNotice: false };
    protected copyToClipboard = (e: React.MouseEvent<HTMLElement>) => {
        navigator.clipboard.writeText(e.currentTarget.id);
        this.setState({ copied: e.currentTarget.id, showNotice: true });
    };
    protected dismissNotice = () => {
        this.setState({ showNotice: false });
    };
    public render() {
        const swatches = Object.keys(colors);
        return (
            <Gallery>
                {swatches.map((swatch) => {
                    return (
                        <GalleryFigure key={swatch}>
                            <Swatch $swatchColor={swatch} id={swatch} onClick={this.copyToClipboard}></Swatch>
                            <GalleryCaption>
                                <Text $type="bodySmall">{swatch}</Text>
                                <br />
                                <Text $type="bodySmall" id={colors[swatch].name} onClick={this.copyToClipboard}>
                                    name: <strong>{colors[swatch].name}</strong>
                                </Text>
                                <br />
                                <Text $type="bodySmall" id={colors[swatch].hex} onClick={this.copyToClipboard}>
                                    hex: <strong>{colors[swatch].hex}</strong>
                                </Text>
                                <br />
                                <Text $type="bodySmall" id={colors[swatch].rgba} onClick={this.copyToClipboard}>
                                    rgba: <strong>{colors[swatch].rgba}</strong>
                                </Text>
                            </GalleryCaption>
                        </GalleryFigure>
                    );
                })}

                <NotificationPanel position="topRight">
                    <Notification
                        dismissable={true}
                        onDismiss={this.dismissNotice}
                        message={<strong>{this.state.copied}</strong>}
                        title={"Copied to Clipboard!"}
                        visible={this.state.showNotice}
                        type="success"
                    />
                </NotificationPanel>
            </Gallery>
        );
    }
}

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof ColorLibrary> = {
    title: "Quarks/Colors",
    component: ColorLibrary,
    tags: ["autodocs"],

    args: {},
    parameters: {
        controls: { hidden: true },
        docs: {
            description: {
                component:
                    "This is our complete color palette. Click on a value to copy it to clipboard. Since this design system is a component-based solution, we keep color names agnostic of their usage. This way 'color' is just a dictionary of objects that we select from.",
            },
        },
    },
    argTypes: {},
};

export default meta;
type Story = StoryObj<typeof ColorLibrary>;
// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const IconGallery: Story = {};
