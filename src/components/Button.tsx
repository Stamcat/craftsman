import { css, ThemeContext, type SerializedStyles } from "@emotion/react";
import styled from "@emotion/styled";
import type { ButtonType } from "../styles/global/components/button";
import type { Theme } from "../styles/theme/types";
import { isEmpty } from "../utilities/validations";

const StyledButton = styled.button<{ size?: number; styles?: SerializedStyles }>`
    ${(props) => props.styles}
    ${(props => props.size && css`
        border-radius: calc(var(--btn-border-radius) * ${props.size});
        padding: calc(var(--btn-pad-y) * ${props.size}) calc(var(--btn-pad-x) * ${props.size});
        font-size: max(10px, calc(var(--w-text) * ${props.size}));
    `)}
`;

export type ButtonProps = React.ComponentProps<"button"> & {
    /** Primary - Call-To-Action, Text - use for non-anchored text buttons */
    variant?: ButtonType;
    /** Scale multiplier (0.1-10); affects padding, border-radius and font size, maintains font legibility at a minimum of 10px. default = 1 */
    size?: number;
    /** Optional Emotion styles override */
    styles?: SerializedStyles;
};
/**
 * Button supports emotion styled components and regular classNames.<br />
 * Color scheme can be changed both by theme or by globalStyles button html element.<br />
 * If button is empty, it will return nothing. This prevents instances of "empty square" which can annoy the end user.
 */
export const Button: React.FC<ButtonProps> = (props) => {
    const { type = "button", variant = "default", className, size, ...rest } = props;
    const normalizedSize = typeof size === "number" ? Math.min(10, Math.max(0.1, size)) : undefined;

    if (isEmpty(props.children)) {
        return <></>;
    }

    return (
        <ThemeContext.Consumer>
            {(theme) => {
                const typedTheme = theme as Theme | undefined;
                const themeClass = typeof typedTheme?.components?.button === "string"
                    ? typedTheme.components.button
                    : undefined;

                const mergedClassName = [
                    variant !== "default" ? variant : undefined,
                    themeClass,
                    className,
                ].filter(Boolean).join(" ") || undefined;

                return <StyledButton type={type} size={normalizedSize} className={mergedClassName} {...rest} />;
            }}
        </ThemeContext.Consumer>
    );
};
