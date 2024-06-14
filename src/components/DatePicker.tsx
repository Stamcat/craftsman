import React from "react";
import { DatePicker as ReactDatePicker, DatePickerProps as ReactDatePickerProps } from "react-date-picker";
import styled, { css } from "styled-components";
import { RuleSet } from "styled-components/dist/types";
import { color } from "../utilities/colors";
import { typeStyles } from "../utilities/font";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import { Label, LabelPosition } from "./Label";
import { Text } from "./Text";

type ValuePiece = Date | null;

export type Value = ValuePiece | [ValuePiece, ValuePiece];

export type DatePickerStyleProps = {
    /** Pass in string or your own elements */
    $label?: string | React.ReactNode;
    $labelPosition?: LabelPosition;
    /** Can be string or anything you want */
    $error?: string | React.ReactNode;
    /** Custom styling applied to the wrapper. You can nest any style inside this object */
    $wrapperStyles?: RuleSet<object>;
    /** Custom styling to your label */
    $labelStyles?: RuleSet<object>;
    /** Custom styling for error element */
    $errorStyles?: RuleSet<object>;
};
export type DatePickerProps = ReactDatePickerProps & DatePickerStyleProps;
const wrapperErrorStyles = css`
    border-color: ${color("red")};
`;

const DatePickerWrapper = styled.div<{
    $wrapperStyles?: RuleSet<object>;
    $labelPosition?: LabelPosition;
    $error: string | React.ReactNode;
}>`
    display: inline-flex;
    flex-flow: row wrap;
    align-content: baseline;
    button {
        border-radius: 3px;
    }
    .react-calendar {
        &__navigation {
            &__label,
            &__arrow {
                ${typeStyles.h5}
                color: ${color("garden")};
            }

            button:enabled:hover {
                background: ${color("greenLight")};
            }
        }

        &__month-view {
            &__weekdays {
                text-transform: unset;
            }
            &__weekdays__weekday {
                font-weight: 400;
            }
            &__days__day--weekend {
                color: unset;
            }
        }
        &__tile {
            border: 1px solid transparent;
            color: ${color("garden")};
            &:enabled:hover {
                background: ${color("greenLight")};
            }
            &:enabled:focus {
                border: 1px dashed ${color("garden")};
            }
            &--active,
            &--hasActive {
                color: ${color("white")};
                background: ${color("garden")};
            }
        }
    }
    .react-date-picker {
        &__button {
            .react-date-picker__button__icon {
                stroke: ${color("greenDark")};
            }
            padding: 3px;
            &:enabled {
                &:hover,
                &:focus {
                    .react-date-picker__button__icon {
                        stroke: ${color("greenLight")};
                    }
                }
            }
        }
    }

    .react-date-picker__wrapper {
        border-color: ${color("garden")};
        border-radius: 3px;
        padding: 3px;
        ${(props) => props.$error && wrapperErrorStyles}
    }
    abbr {
        display: inline-flex;
        width: 30px;
        height: 30px;
        justify-content: center;
        align-items: center;
    }

    ${(props) => props.$wrapperStyles}
`;
/**
 * We use react-date-picker along with our custom styles.
 * You can also pass your own style delcarations using $styles.
 * The Styled Component makes use of css specificity to override
 * thanks to the component being nested inside a wrapper. <a href="https://github.com/wojtekmaj/react-date-picker" target="_blank">See the full documentation</a>
 * @param props
 * @returns
 * #__PURE__
 */
export const DatePicker: React.FC<DatePickerProps> = (props) => {
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
        <DatePickerWrapper
            $wrapperStyles={props.$wrapperStyles}
            $labelPosition={props.$labelPosition}
            $error={props.$error}>
            {props.$labelPosition !== "bottom" && props.$labelPosition !== "right" && renderLabel()}
            <ReactDatePicker locale={props.locale || "en-US"} clearIcon={props.clearIcon || null} {...props} />
            {(props.$labelPosition === "bottom" || props.$labelPosition === "right") && renderLabel()}
            {props.$error && renderError()}
        </DatePickerWrapper>
    );
};
