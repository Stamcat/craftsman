import React from "react";
import styled, { css } from "styled-components";
import { color } from "../utilities/colors";
import { RuleSet } from "styled-components/dist/types";
import { width } from "../utilities/layout";

export interface TextProps
    extends React.ComponentPropsWithoutRef<"h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "small" | "span"> {
    $type?:
        | "h1"
        | "h2"
        | "h3"
        | "h4"
        | "h5"
        | "h6"
        | "p"
        | "span"
        | "caption"
        | "body"
        | "bodyLarge"
        | "bodyXLarge"
        | "bodySmall";
    $styles?: RuleSet<object>;
    children?: React.ReactNode;
    $bold?: boolean;
    $italic?: boolean;
    $error?: boolean;
}
const boldStyles = css`
    font-weight: 700;
`;
const italicStyle = css`
    font-style: italic;
`;
const errorStyles = css`
    color: ${color("red")};
    margin: ${width("gutter", 0.25)} 0;
`;
interface TextStylesProps {
    $styles?: RuleSet<object>;
    $bold?: boolean;
    $italic?: boolean;
    $error?: boolean;
}
const textStyles = css<TextStylesProps>`
    ${(props) => props.$bold && boldStyles}
    ${(props) => props.$italic && italicStyle}
    ${(props) => props.$error && errorStyles}
    ${(props) => props.$styles}
`;
const H1 = styled.h1<TextStylesProps>`
    ${textStyles}
`;
const H2 = styled.h2<TextStylesProps>`
    ${textStyles}
`;
const H3 = styled.h3<TextStylesProps>`
    ${textStyles}
`;
const H4 = styled.h4<TextStylesProps>`
    ${textStyles}
`;
const H5 = styled.h5<TextStylesProps>`
    ${textStyles}
`;
const H6 = styled.h6<TextStylesProps>`
    ${textStyles}
`;
const BodyLarge = styled.p<TextStylesProps>`
    font-size: 18px;
    line-height: ${18 * 1.5}px;
    ${textStyles}
`;
const BodyXLarge = styled.p<TextStylesProps>`
    font-size: 22px;
    line-height: ${22 * 1.5}px;
    ${textStyles}
`;
const P = styled.p<TextStylesProps>`
    ${textStyles}
`;
const Caption = styled.small<TextStylesProps>`
    font-size: 12px;
    line-height: ${12 * 1.5}px;
    letter-spacing: 0.12px;
    ${textStyles}
`;
const Small = styled.small<TextStylesProps>`
    ${textStyles}
`;
const Span = styled.span<TextStylesProps>`
    ${textStyles}
`;
// What should a given type actually request from React?
const tags = {
    h1: (c: TextProps) => <H1 {...c} />,
    h2: (c: TextProps) => <H2 {...c} />,
    h3: (c: TextProps) => <H3 {...c} />,
    h4: (c: TextProps) => <H4 {...c} />,
    h5: (c: TextProps) => <H5 {...c} />,
    h6: (c: TextProps) => <H6 {...c} />,
    p: (c: TextProps) => <P {...c} />,
    span: (c: TextProps) => <Span {...c} />,
    caption: (c: TextProps) => <Caption {...c} />,
    body: (c: TextProps) => <P {...c} />,
    bodyLarge: (c: TextProps) => <BodyLarge {...c} />,
    bodyXLarge: (c: TextProps) => <BodyXLarge {...c} />,
    bodySmall: (c: TextProps) => <Small {...c} />,
};

/**
 * The vast majority of our typographic solutions will use the HTML5 tags we're all familiar with.
 * For the outliers, we have a custom Text component that comes pre-programmed to support all of the typographic variants described in the Design System.
 * @param props
 * @returns
 * #__PURE__
 */
export const Text: React.FC<TextProps> = (props) => {
    return tags[props.$type || "p"](props);
};
