import type { SerializedStyles } from "@emotion/react";
import styled from "@emotion/styled";
import type { ButtonType } from "../styles/global/components/button";

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
    const mergedClassName = variant === "default"
        ? className
        : [variant, className].filter(Boolean).join(" ");

    return <StyledButton type={type} className={mergedClassName} {...rest} />
};
