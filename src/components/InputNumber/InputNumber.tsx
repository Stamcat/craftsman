"use client";

import { useRef } from "react";
import type { TextInputType } from "../../utilities/types";
import { Button } from "../Button/Button";
import { Input, type InputProps } from "../Input/Input";
import clsx from "clsx";
import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";
import "./InputNumber.scss";

export type InputNumberProps = React.ComponentProps<"input"> & {
} & Omit<InputProps, "type" | "endAdornment"> & {
    type?: Extract<TextInputType, "number">;
    onDecrement?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    onIncrement?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    iconIncrement?: React.ReactNode;
    iconDecrement?: React.ReactNode;
};

/**
 * InputNumber provides a flipper component to increment numbers using native controls
 */
export const InputNumber: React.FC<InputNumberProps> = ({
    type = "number",
    className,
    iconIncrement,
    iconDecrement,
    onDecrement,
    onIncrement,
    ...props
}) => {
    const inputRef = useRef<HTMLInputElement>(null);

    // Mirrors native number input spinners: mutate the element then dispatch "input" so a controlled onChange still fires.
    const onPressDown = (e: React.MouseEvent<HTMLButtonElement>) => {
        const input = inputRef.current;
        if (input) {
            input.stepDown();
            input.dispatchEvent(new Event("input", { bubbles: true }));
        }
        onDecrement?.(e);
    };
    const onPressUp = (e: React.MouseEvent<HTMLButtonElement>) => {
        const input = inputRef.current;
        if (input) {
            input.stepUp();
            input.dispatchEvent(new Event("input", { bubbles: true }));
        }
        onIncrement?.(e);
    };

    return (
        <Input
            ref={inputRef}
            className={clsx("inputNumber", className)}
            preAdornment={<Button variant="text" onClick={onPressDown}>{iconIncrement || <IoRemoveCircleOutline size="26" />}</Button>}
            endAdornment={<Button variant="text" onClick={onPressUp}>{iconDecrement || <IoAddCircleOutline size="26" />}</Button>}
            {...props}
            type={type}
        />
    );
};
