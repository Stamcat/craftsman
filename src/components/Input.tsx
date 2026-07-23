import { css, type SerializedStyles } from "@emotion/react";
import styled from "@emotion/styled";
import { useId } from "react";
import { isEmpty } from "../utilities/validations";
import type { LabelPosition, TextInputType } from "../styles/utilities/types";
import {
    inputErrorStyles,
    inputFieldAdornmentStyles,
    insideLabelStyles,
} from "../styles/global/components/input";
import { width } from "../styles/utilities/layout";
import { color } from "../styles/utilities/color";

const inputWrapperStyles = (hasInput: boolean, required: boolean) => css`
    label {
        .input-label {
            margin-bottom: ${width("gutter", 0.25)};
            ${required && css`
                ::after {
                    content: "*";
                    color: ${color("red700")};
                }
            `}
        }
    }

    &[data-label-position="left"] label {
        display: inline-flex;
        align-items: center;
        .input-label {
            width: fit-content;
            margin-right: ${width("gutter", 0.75)};
        }
    }

    &[data-label-position="bottom"] label {
        display: inline-flex;
        flex-direction: column-reverse;
        align-items: flex-start;
        .input-label {
            margin-bottom: 0;
            margin-top: ${width("gutter", 0.25)};
        }
    }

    &[data-label-position="right"] label {
        display: inline-flex;
        flex-direction: row-reverse;
        align-items: center;
        .input-label {
            margin-left: ${width("gutter", 0.75)};
        }
    }

    &[data-label-position="inside"] {
        ${insideLabelStyles(hasInput)}
    }
`;
type InputWrapperStyles = {
    hasInput: boolean;
    required: boolean;
    hasEndAdornment: boolean;
    styles?: SerializedStyles;
}
const InputWrapper = styled.div<InputWrapperStyles>`
    ${(props) => inputWrapperStyles(props.hasInput, props.required)}
    ${(props) => props.hasEndAdornment && inputFieldAdornmentStyles}
    ${(props) => props.styles}
`;

const Error = styled.div`
    ${inputErrorStyles}
`;

export type InputProps = React.ComponentProps<"input"> & {
    /** String is recommended, use ReactNode to for custom elements */
    label?: string | React.ReactNode;
    /** Default position is top. Strongly recommend text label for accessibility, use 'hidden' if you don't want to display it. */
    labelPosition?: LabelPosition;
    /** String will render error with text, true changes only field style, use ReactNode to for custom elements */
    error?: string | boolean | React.ReactNode;
    /** Shows Required '*' if true */
    required?: boolean;
    /** Optional Emotion Styles applied to the wrapper, use nesting to access selectors within */
    styles?: SerializedStyles;
    /** Optional trailing element rendered inside the input field wrapper. This can be a button, icon, etc */
    endAdornment?: React.ReactNode;
    /** Exclude Checkbox and Radio, we have dedicated components for those. */
    type?: TextInputType;
};

/**
 * For accessibility, we recommend using assigning an ID to every Input element.
 * If no ID exists, we will generate a random value.
 */
export const Input: React.FC<InputProps> = ({
    label,
    id,
    labelPosition = "top",
    required = false,
    type = "text",
    error,
    styles,
    endAdornment,
    ...props
}) => {
    const generatedId = useId();
    const inputId = id || generatedId;
    const hasInput = !isEmpty(props.value) || !isEmpty(props.defaultValue);
    const inputElement = (
        <span className="input-field" data-has-end-adornment={!isEmpty(endAdornment)}>
            <input id={inputId} type={type} {...props} />
            {!isEmpty(endAdornment) && <span className="input-adornment">{endAdornment}</span>}
        </span>
    );

    return (
        <InputWrapper data-label-position={labelPosition} hasEndAdornment={!isEmpty(endAdornment)} required={required} hasInput={hasInput} styles={styles}>
            {isEmpty(label) ? (
                inputElement
            ) : (
                <label>
                    {labelPosition !== "hidden" && <div className="input-label">{label}</div>}
                        {inputElement}
                </label>
            )}
            {!isEmpty(error) && <Error>{error}</Error>}
        </InputWrapper>
    );
};
