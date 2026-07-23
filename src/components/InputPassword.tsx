import { useState } from "react";
import type { TextInputType } from "../styles/utilities/types";
import { ImEye, ImEyeBlocked } from "react-icons/im";
import { Button } from "./Button";
import { Input, type InputProps } from "./Input";
import { css } from "@emotion/react";

const inputPasswordToggleStyles = css`
    padding: 0;
    display: inline-flex;
    align-items: center;
    line-height: 1;
`;


const EyeIconToggle = ({ visible, onToggle }: { visible: boolean; onToggle: () => void }) => (
    <Button
        type="button"
        variant="text"
        onClick={onToggle}
        aria-label={visible ? "Hide password" : "Show password"}
        aria-pressed={visible}
        styles={inputPasswordToggleStyles}
    >
        {visible ? <ImEye size={16} /> : <ImEyeBlocked size={16} />}
    </Button>
);

export type InputPasswordProps = React.ComponentProps<"input"> & {
} & Omit<InputProps, "type" | "endAdornment"> & {
    type?: Extract<TextInputType, "password">;
};
/**
 * InputPassword implements Input but includes specialized handling for show/hide toggle of password to show plain text.
 */
export const InputPassword: React.FC<InputPasswordProps> = ({
    type = "password",
    ...props
}) => {
    const [visible, setVisible] = useState(false);
    const resolvedType = visible ? "text" : type;

    return (
        <Input
            {...props}
            type={resolvedType}
            endAdornment={<EyeIconToggle visible={visible} onToggle={() => setVisible((prev) => !prev)} />}
        />
    );
};
