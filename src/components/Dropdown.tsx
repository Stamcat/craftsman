import { width } from "../utilities/layout";
import React from "react";
import styled, { css } from "styled-components";
import { RuleSet } from "styled-components/dist/types";
import { color } from "../utilities/colors";
import { Text } from "./Text";
import { Label, LabelPosition } from "./Label";

const DropdownWrapper = styled.div<{ $labelPosition?: LabelPosition; $wrapperStyles?: RuleSet<object> }>`
    display: inline-flex;
    flex-flow: row wrap;
    align-content: baseline;
    ${(props) => props.$wrapperStyles}
`;
const errorStyles = css`
    border-color: ${color("red")};
`;
const StyledDropdown = styled.select<{ $dropdownStyles?: RuleSet<object>; $error?: string | React.ReactNode }>`
    padding: ${width("gutter", 0.5)} ${width("gutter")} ${width("gutter", 0.5)} ${width("gutter", 0.5)};
    background-color: ${color("white")};
    border-radius: 3px;
    border-color: ${color("gray3")};
    //  border: 1px solid
    ${(props) => props.$dropdownStyles}
    ${(props) => props.$error && errorStyles}
`;

export type DropdownProps = React.ComponentPropsWithoutRef<"select"> & {
    /** Renders inside a label element */
    $label?: string | React.ReactNode;
    $labelPosition?: LabelPosition;
    /** Dropdown options with key & label props for better rendering */
    $options: DropdownOption[];
    /** Error message, string or any element you want */
    $error?: string | React.ReactNode;
    /** Custom styles for your wrapper, you can nest any style inside this */
    $wrapperStyles?: RuleSet<object>;
    /** Custom styles for your label */
    $labelStyles?: RuleSet<object>;
    /** Custom styles for dropdown element */
    $dropdownStyles?: RuleSet<object>;
    /** Custom error styles */
    $errorStyles?: RuleSet<object>;
};
export type DropdownOption = React.ComponentPropsWithoutRef<"option"> & {
    key: string;
    label: string;
};
/**
 * This dropdown select handles label & options. Everything is formatted and standardized so you only have to worry about handling data.
 * @param props
 * @returns
 * #__PURE__
 */
export const Dropdown: React.FC<DropdownProps> = (props) => {
    if (props.placeholder) {
        props.$options.unshift({
            key: props.placeholder,
            value: props.placeholder,
            defaultValue: props.placeholder,
            disabled: true,
            label: props.placeholder,
        });
    }
    const renderLabel = () => {
        return (
            <>
                {props.$label && (
                    <Label
                        htmlFor={props.id}
                        $labelPosition={props.$labelPosition}
                        $labelStyles={props.$labelStyles}
                        placeholder="Select">
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
        <DropdownWrapper $labelPosition={props.$labelPosition} $wrapperStyles={props.$wrapperStyles}>
            {props.$labelPosition !== "bottom" && props.$labelPosition !== "right" && renderLabel()}
            <StyledDropdown $dropdownStyles={props.$dropdownStyles} {...props}>
                {props.$options.map((opt) => {
                    return <option {...opt}>{opt.label}</option>;
                })}
            </StyledDropdown>
            {(props.$labelPosition === "bottom" || props.$labelPosition === "right") && renderLabel()}
            {props.$error && renderError()}
        </DropdownWrapper>
    );
};
