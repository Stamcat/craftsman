"use client";

import { useState } from "react";
import type { TextInputType } from "../../utilities/types";
import { ImEye, ImEyeBlocked } from "react-icons/im";
import { Button } from "../Button/Button";
import { Input, type InputProps } from "../Input/Input";
import clsx from "clsx";


const EyeIconToggle = ({ visible, onToggle }: { visible: boolean; onToggle: () => void }) => (
    <Button
        type="button"
        variant="text"
        onClick={onToggle}
        aria-label={visible ? "Hide password" : "Show password"}
        aria-pressed={visible}
        className="input-view-toggle"
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
    className,
    ...props
}) => {
    const [visible, setVisible] = useState(false);
    const resolvedType = visible ? "text" : type;

    return (
        <Input
            className={clsx("inputPassword", className)}
            {...props}
            type={resolvedType}
            endAdornment={<EyeIconToggle visible={visible} onToggle={() => setVisible((prev) => !prev)} />}
        />
    );
};
