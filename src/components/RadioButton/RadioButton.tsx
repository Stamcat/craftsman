"use client";

import type { RadioLabelPosition } from "../../styles";
import { Input, type InputProps } from "../Input/Input"

type RadioButtonProps = InputProps & {
    type?: "radio";
    labelPosition?: RadioLabelPosition;
    /** Scale multiplier (0.1-10); affects the radio button's visual size. default = 1 */
    size?: number;
}
/**
 * Radio Button simply implements Input, but it has some guardrails in place to maintain correct of usage of Radio button elements.
 */
export const RadioButton: React.FC<RadioButtonProps> = ({ type = "radio", labelPosition = "right", size, style, ...props }) => {
    const normalizedSize = typeof size === "number" ? Math.min(10, Math.max(0.1, size)) : undefined;
    const sizeStyle = normalizedSize ? ({ "--radio-size": normalizedSize } as React.CSSProperties) : undefined;
    return <Input type={type} labelPosition={labelPosition} style={{ ...sizeStyle, ...style }} {...props} />
}
