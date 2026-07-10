import { useTheme, type SerializedStyles } from "@emotion/react";
import styled from "@emotion/styled";
import type { ButtonType } from "../styles/global/components/button";
import type { Theme } from "../styles/theme/types";

const StyledButton = styled.button<{ styles?: SerializedStyles }>`
    ${(props) => props.styles}
`;

export type ButtonProps = React.ComponentProps<"button"> & {
    /* Primary - Call-To-Action, Text - use for non-anchored text buttons */
    variant?: ButtonType;
    /* Optional Emotion Styles */
    styles?: SerializedStyles;

};
/**
 * Button supports emotion styled components and regular classNames.
 * Color scheme can be changed both by theme or by globalStyles button html element.
 */
export const Button: React.FC<ButtonProps> = (props) => {
    const { type = "button", variant = "default", className, ...rest } = props;
    const theme = useTheme() as Theme;
    const themeClass = typeof theme?.components?.button === 'string'
        ? theme.components.button
        : undefined;

    const mergedClassName = [
        variant !== "default" ? variant : undefined,
        themeClass,
        className,
    ].filter(Boolean).join(" ") || undefined;

    return <StyledButton type={type} className={mergedClassName} {...rest} />
};
