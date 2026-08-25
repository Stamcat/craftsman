"use client";

import { Input, type InputProps } from "../Input/Input"
import type { CheckboxLabelPosition } from "../../utilities/types";

export type CheckboxProps = InputProps & {
    type?: "checkbox";
    labelPosition?: CheckboxLabelPosition;
    /** Scale multiplier (0.1-10); affects the checkbox's visual size. default = 1 */
    size?: number;
}
/**
 * Checkbox implements Input, but it has some guardrails in place to maintain correct of usage of Checkbox elements.
 */
export const Checkbox: React.FC<CheckboxProps> = ({ type = "checkbox", labelPosition = "right", size, style, ...props }) => {
    const normalizedSize = typeof size === "number" ? Math.min(10, Math.max(0.1, size)) : undefined;
    const sizeStyle = normalizedSize ? ({ "--checkbox-size": normalizedSize } as React.CSSProperties) : undefined;
    return <Input type={type} labelPosition={labelPosition} style={{ ...sizeStyle, ...style }} {...props} />
}
