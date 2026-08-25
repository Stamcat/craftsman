"use client";

import { Input, type InputProps } from "../Input/Input"
import type { CheckboxLabelPosition } from "../../utilities/types";

export type CheckboxProps = InputProps & {
    type?: "checkbox";
    labelPosition?: CheckboxLabelPosition;
}
/**
 * Checkbox implements Input, but it has some guardrails in place to maintain correct of usage of Checkbox elements.
 */
export const Checkbox: React.FC<CheckboxProps> = ({ type = "checkbox", labelPosition = "right", ...props}) => {
    return <Input type={type} labelPosition={labelPosition} {...props} />
}
