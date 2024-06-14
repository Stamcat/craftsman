import React from "react";
import styled, { css } from "styled-components";
import { RuleSet } from "styled-components/dist/types";
import { color } from "../utilities/colors";
import { Text } from "./Text";
import { Label, LabelPosition } from "./Label";

/**
 * React defines this type simply as string, which is less helpful.
 * These are the actual types for the HTML component. We then extend it with our own.
 * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#input_types
 */
export type TextInputType =
    | "button"
    | "checkbox"
    | "color"
    | "date"
    | "datetime-local"
    | "email"
    | "file"
    | "hidden"
    | "image"
    | "month"
    | "number"
    | "password"
    | "radio"
    | "range"
    | "reset"
    | "search"
    | "submit"
    | "tel"
    | "text"
    | "time"
    | "url"
    | "week";

export interface TextInputProps extends React.ComponentProps<"input"> {
    type?: TextInputType;
    $label?: string | React.ReactNode;
    $labelPosition?: LabelPosition;
    $error?: string | React.ReactNode;
    /** Custom styles for wrapper, you can nest any styles you want inside here. */
    $wrapperStyles?: RuleSet<object>;
    /** Custom styles for input only */
    $inputStyles?: RuleSet<object>;
    /** Custom styles for label only */
    $labelStyles?: RuleSet<object>;
    /** Custom styles for error only */
    $errorStyles?: RuleSet<object>;
}

const InputWrapper = styled.div<{ $labelPosition?: LabelPosition; $wrapperStyles?: RuleSet<object> }>`
    ${(props) =>
        (props.$labelPosition === "top" || props.$labelPosition === "bottom") &&
        css`
            display: inline-flex;
            flex-flow: row wrap;
            width: 100%;
        `}
    align-content: baseline;
    ${(props) => props.$wrapperStyles}
`;
const inputErrorStyles = css`
    border-color: ${color("red")};
`;
const StyledInput = styled.input<{ $inputStyles?: RuleSet<object>; $error?: boolean }>`
    ${(props) => props.$error && inputErrorStyles}
    ${(props) => props.$inputStyles}
`;
/**
 * The Input component is designed to handle every type of input you're already used to.
 * In addition we provide built-in styling for labels, with label position arguments
 * @param props
 * @returns
 */
export const Input: React.FC<TextInputProps> = (props: TextInputProps) => {
    const renderLabel = () => {
        return (
            <>
                {props.$label && (
                    <Label htmlFor={props.id} $labelPosition={props.$labelPosition} $labelStyles={props.$labelStyles}>
                        {props.$label}
                        {props.required && "*"}
                    </Label>
                )}
            </>
        );
    };
    const renderError = () => {
        return (
            <>
                {props.$error && (
                    <Text
                        $type="p"
                        $error={true}
                        $styles={css`
                            width: 100%;
                            ${props.$errorStyles}
                        `}>
                        {props.$error}
                    </Text>
                )}
            </>
        );
    };
    return (
        <InputWrapper $labelPosition={props.$labelPosition} $wrapperStyles={props.$wrapperStyles}>
            {props.$labelPosition !== "bottom" && props.$labelPosition !== "right" && renderLabel()}
            <StyledInput {...props} $inputStyles={props.$inputStyles} $error={props.$error ? true : false} />
            {(props.$labelPosition === "bottom" || props.$labelPosition === "right") && renderLabel()}
            {renderError()}
        </InputWrapper>
    );
};
