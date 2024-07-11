import React from "react";
import styled, { css } from "styled-components";
import { color } from "../utilities/colors";
import { RuleSet } from "styled-components/dist/types";
import { width } from "../utilities/layout";

export type BtnType = "primary" | "secondary" | "text";
export type BtnSize = "small" | "medium" | "large" | "xLarge";

export interface ButtonProps extends React.ComponentProps<"button"> {
    /** Applies formatting an SVG icon you pass in */
    $icon?: React.ReactElement;
    /** Applies standardized sizing to all elements within button */
    $size?: BtnSize;
    /** Renders inside a span, can be string or your own formatted text element */
    $label?: string | React.ReactNode;
    /** Applies style sets */
    $type: BtnType;
    /** Pass in any custom styles here, you can also nest styles inside this object */
    $styles?: RuleSet<object>;
}
/**
 * https://jidefr.medium.com/using-css-variables-with-styled-components-3886f8ee35a0
 */
const sizeStyles = (size: BtnSize) => {
    const s = {
        small: css`
            padding: 4px ${width("gutter")};
        `,
        medium: css`
            padding: 6px ${width("gutter", 1.5)};
        `,
        large: css`
            padding: 8px ${width("gutter", 2)};
        `,
        xLarge: css`
            padding: 10px ${width("gutter", 1.5)};
        `,
    };
    return s[size];
};
const iconSizeStyles: Record<BtnSize, RuleSet<object>> = {
    small: css`
        padding: 4px ${width("gutter")} 4px ${width("gutter", 0.25)};
    `,
    medium: css`
        padding: 6px ${width("gutter", 1.5)} 6px ${width("gutter", 0.25)};
    `,
    large: css`
        padding: 8px ${width("gutter", 2)} 8px ${width("gutter", 0.25)};
    `,
    xLarge: css`
        padding: 10px ${width("gutter", 1.5)} 10px ${width("gutter", 0.25)};
    `,
};

const primaryStyles = (size: BtnSize) => {

    return css`
        color: ${color("white")};
        background-color: ${color("garden")};
        border-radius: 6px;
        border: 3px solid transparent;
        &:hover {
            background-color: ${color("green3")};
        }
        &:visited {
            background-color: ${color("green4")};
        }
        &:focus {
            background-color: ${color("darkgreen")};
        }
        &:disabled,
        &.disabled {
            color: ${color("white")};
            background-color: ${color("gray4")};
        }
        ${sizeStyles(size)}
    `;
};

const secondaryStyles = (size: BtnSize) => {
    return css`
        background-color: ${color("white")};
        border: 1px solid ${color("garden")};
        &:hover,
        &:active {
            background-color: ${color("greenLight2")};
        }
        &:focus {
            border: 1px dashed ${color("garden")};
        }
        &:disabled,
        &.disabled {
            color: ${color("gray4")};
            border-color: ${color("gray4")};
        }
        ${sizeStyles(size)}
    `;
};

const txtStyles = css`
    color: ${color("greenDark")};
    text-decoration: underline;
    padding: 0;
    &:disabled,
    &.disabled {
        color: ${color("gray4")};
    }
`;

const btnStyles = (props: ButtonProps) => {
    const size = props.$size || "medium";
    const btnTypes = {
        primary: primaryStyles(size),
        secondary: secondaryStyles(size),
        text: txtStyles,
    };
    return btnTypes[props.$type];
};
const iconStyles = (props: ButtonProps) => {
    const size = props.$size || "medium";
    return css`
        min-width: 100px;
        display: inline-flex;
        flex-flow: row nowrap;
        ${iconSizeStyles[size]}
    `;
};
const StyledButton = styled.button<ButtonProps>`
    border-width: 0;
    height: fit-content;
    align-items: center;
    background: transparent;
    color: ${color("garden")};
    text-align: center;
    //
    span {
        width: 100%;
    }
    ${(props) => btnStyles(props)}
    ${(props) => props.$icon && iconStyles(props)}
    ${(props) => props.$styles}
`;
const iconSizes: Record<BtnSize, RuleSet<object>> = {
    small: css`
        width: 20px;
        margin-right: 4px;
    `,
    medium: css`
        width: 24px;
        margin-right: 6px;
    `,
    large: css`
        width: 34px;
        margin-right: 10px;
    `,
    xLarge: css`
        width: 36px;
        margin-right: 12px;
    `,
};
const IconWrapper = styled.div<{ $size: BtnSize }>`
    flex: 0;
    display: inline-flex;
    justify-content: center;
    fill: white;
    svg {
        ${(props) => iconSizes[props.$size]}
    }
`;

/**
 * This is still a work in progress.
 * @param props
 * @returns
 * #__PURE__
 */
export const Button: React.FC<ButtonProps> = (props) => {
    return (
        <StyledButton {...props}>
            {props.$icon && <IconWrapper $size={props.$size ?? "medium"}>{props.$icon}</IconWrapper>}
            {props.$label && <span>{props.$label}</span>}
            {props.children}
        </StyledButton>
    );
};
