import React from "react";
import styled, { css } from "styled-components";
import { RuleSet } from "styled-components/dist/types";
import { width } from "../utilities/layout";

export type LabelPosition = "top" | "left" | "bottom" | "right";

export interface LabelProps extends React.ComponentProps<"label"> {
    $labelPosition?: LabelPosition;
    /** Custom styles can be passed */
    $labelStyles?: RuleSet<object>;
}

const getStyledLabelPosition = ($labelPosition?: LabelPosition) => {
    if ($labelPosition === "left") {
        return css`
            margin-top: ${width("gutter", 0.25)};
            margin-right: ${width("gutter", 0.5)};
        `;
    }
    if ($labelPosition === "top") {
        return css`
            margin-bottom: ${width("gutter", 0.5)};
            width: 100%;
        `;
    }
    if ($labelPosition === "right") {
        return css`
            margin-top: ${width("gutter", 0.25)};
            margin-left: ${width("gutter", 0.5)};
        `;
    }
    if ($labelPosition === "bottom") {
        return css`
            margin-top: ${width("gutter", 0.5)};
            width: 100%;
        `;
    }
    return css`
        margin-right: ${width("gutter", 0.5)};
    `;
};
const StyledLabel = styled.label<{ $labelPosition?: LabelPosition; $labelStyles?: RuleSet<object> }>`
    ${(props) => props.$labelPosition && getStyledLabelPosition(props.$labelPosition)}
    ${(props) => props.$labelStyles}
`;
/**
 * Label comes built into the Input, Dropdown & DatePicker components so it is unlikely you will need to use this component directly.
 * We document it here in case you find it helpful for building custom components.
 * Label is a very simple component with some styles pre-built for positioning only.
 * Everything else that you'd expect to do with a label is handled by the implementation.
 * @param props
 * @returns
 * #__PURE__
 */
export const Label: React.FC<LabelProps> = (props: LabelProps) => {
    return <StyledLabel $labelPosition={props.$labelPosition} $labelStyles={props.$labelStyles} {...props} />;
};
