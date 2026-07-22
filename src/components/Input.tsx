import { css, type SerializedStyles } from "@emotion/react";
import styled from "@emotion/styled";
import { isEmpty } from "../utilities/validations";
import { width } from "../styles/utilities/layout";
import { color, type TextInputExclusions } from "../styles";

export type LabelPosition = "top" | "left" | "bottom" | "right" | "inside" | "hidden";

const tinyStyles = css`
    .input-label {
        top: -0.5rem;
        left: ${width("gutter", 0.25)};
        font-size: ${width("text", 0.75)};
    }
`;
const tinyLabelStyles = (hasInput: boolean) => css`
    --react-international-phone-height: 50px;
    --react-international-phone-border-radius: 8px;
    --react-international-phone-border-color: #c0c0c0ff;
    position: relative;

    .input-label {
        position: absolute;
        background-color: white;
        z-index: 1;
        width: fit-content;
        padding: 0 5px;
        top: ${width("gutter", 0.25)};
        left: ${width("gutter", 0.25)};
        pointer-events: none;
        transition: top 150ms ease, left 150ms ease, font-size 150ms ease, color 150ms ease;
    }

    > label > input,
    > input {
        transition: border-color 200ms ease;
    }
    &:focus-within {
        ${tinyStyles}
        .input-label {
            color: ${color("blue500")};
        }
        input {
            border-color: ${color("blue500")};
        }
    }

    &:has(input:not(:placeholder-shown)) {
        ${tinyStyles}
    }

    &:has(input:-webkit-autofill) {
        ${tinyStyles}
    }

    ${hasInput ? tinyStyles : ""}
    input[type="tel"] {
        width: 100%;
    }

    input::placeholder {
        opacity: 0;
        transition: opacity 200ms ease;
    }

    &:focus-within input::placeholder {
        opacity: 1;
    }
`;

const InputWrapper = styled.div<{ hasInput: boolean, required: boolean, styles?: SerializedStyles }>`
    label {
        .input-label {
            margin-bottom: ${width("gutter", 0.25)};
            ${(props) => props.required && css`
                ::after {
                    content: "*";
                    color: ${color("red700")};
                }
            `}
            
        }
    }
    &.left label {
        .input-label {
            width: fit-content;
            margin-right: ${width("gutter", 0.75)};
        }
        display: inline-flex;
        align-items: center;
    }
    &.bottom label {
        display: inline-flex;
        flex-direction: column-reverse;
        align-items: flex-start;
        .input-label {
            display: block;
            margin-bottom: 0;
            margin-top: ${width("gutter", 0.25)};
        }
    }
    &.right label {
        display: inline-flex;
        flex-direction: row-reverse;
        align-items: center;
        .input-label {
            display: block;
            margin-left: ${width("gutter", 0.75)};
        }
    }
    &.inside {
        ${(props) => tinyLabelStyles(props.hasInput)}
    }
    ${(props) => props.styles}
`;

const Error = styled.div`
    margin-top: ${width("gutter", 0.25)};
    font-size: ${width("text", 0.75)};
    color: ${color("red700")};
`;


export type InputProps = React.ComponentProps<"input"> & {
    /** String is recommended, use ReactNode to for custom elements */
    label?: string | React.ReactNode;
    /** Default position is top. Strongly recommend text label for accessibility, use 'hidden' if you don't want to display it. */
    labelPosition?: LabelPosition;
    /** String will render error with text, true changes only field style, use ReactNode to for custom elements */
    error?: string | boolean | React.ReactNode;
    required?: boolean;
    /** Optional Emotion Styles applied to the wrapper, use nesting to access selectors within */
    styles?: SerializedStyles;
    /** Exclude Checkbox and Radio, we have dedicated components for those. */
    type?: Exclude<React.HTMLInputTypeAttribute, TextInputExclusions>;
};

/**
 * For accessibility, we recommend using assigning an ID to every Input element.
 * If no ID exists, we will generate a random value.
 */
export const Input: React.FC<InputProps> = ({ label, id, labelPosition = "top", required = false, error, styles, ...props }) => {
    const inputId = id || crypto.randomUUID();
    const hasInput = !isEmpty(props.value) || !isEmpty(props.defaultValue);
    const hasError = !isEmpty(error);
    return (
        <InputWrapper className={labelPosition} required={required} hasInput={hasInput} styles={styles}>
            {!isEmpty(label) ? (
                <label>
                    {labelPosition !== "hidden" && (
                        <div className="input-label">{label}</div>
                    )}
                    <input id={inputId} {...props} />
                </label>
            ) : (
                    <input id={inputId} {...props} />
            )}
            {hasError && (
                <Error>{error}</Error>
            )}
        </InputWrapper>
    );
};
