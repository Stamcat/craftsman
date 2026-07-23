import { Input, type InputProps } from "./Input"

type RadioButtonProps = InputProps & {
    type?: "radio";
    labelPosition?: "left" | "right"; 
}
/**
 * Radio Button simply implements Input, but it has some guardrails in place to maintain correct of usage of Radio button elements.
 */
export const RadioButton: React.FC<RadioButtonProps> = ({ type = "radio", labelPosition = "right", ...props}) => {
    return <Input type={type} labelPosition={labelPosition} {...props} />
}
