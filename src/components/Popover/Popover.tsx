"use client";
import { useFloating, autoUpdate, offset, flip, shift, type Placement, type Strategy } from "@floating-ui/react-dom";
import clsx from "clsx";
import React, { useEffect, useId, useRef, useState } from "react";
import "./Popover.scss";

export type PopoverProps = {
    anchor: React.ReactNode;
    content: React.ReactNode;
    placement?: Placement;
    strategy?: Strategy;
    trigger?: "click" | "hover";
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    anchorStyles?: React.CSSProperties;
    contentStyles?: React.CSSProperties;
}

/**
 * Popover uses floating-ui to anchor richer, interactive content to any element.
 * Unlike Tooltip (hint text, hover-first), Popover defaults to click-to-open and supports controlled `open` state.
 * @param props
 */
export const Popover: React.FC<PopoverProps> = (props) => {
    const { trigger = "click" } = props;
    const contentId = useId();
    const [referenceEl, setReferenceEl] = useState<Element | null>(null);
    const [floatingEl, setFloatingEl] = useState<HTMLElement | null>(null);
    const { floatingStyles, placement } = useFloating({
        placement: props.placement ?? "bottom-start",
        strategy: props.strategy ?? "absolute",
        whileElementsMounted: autoUpdate,
        middleware: [offset(12), flip(), shift()],
        elements: { reference: referenceEl, floating: floatingEl },
    });
    const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
    const isControlled = props.open !== undefined;
    const open = isControlled ? props.open! : uncontrolledOpen;
    // Restores keyboard focus to whatever triggered the popover once it closes.
    const lastFocusedRef = useRef<HTMLElement | null>(null);

    const setOpen = (next: boolean) => {
        if (!isControlled) { setUncontrolledOpen(next); }
        props.onOpenChange?.(next);
    };

    useEffect(() => {
        if (!open) { return undefined; }
        const handlePointerDown = (e: PointerEvent) => {
            if (referenceEl?.contains(e.target as Node)) { return; }
            if (floatingEl?.contains(e.target as Node)) { return; }
            setOpen(false);
        };
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") { setOpen(false); }
        };
        document.addEventListener("pointerdown", handlePointerDown);
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("pointerdown", handlePointerDown);
            document.removeEventListener("keydown", handleKeyDown);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open, referenceEl, floatingEl]);

    useEffect(() => {
        if (open) {
            lastFocusedRef.current = document.activeElement as HTMLElement | null;
            floatingEl?.focus();
        } else {
            lastFocusedRef.current?.focus();
        }
    }, [open, floatingEl]);

    const handleMouseEnter = () => { if (trigger === "hover") { setOpen(true); } };
    const handleMouseLeave = () => { if (trigger === "hover") { setOpen(false); } };
    const handleClick = () => { if (trigger === "click") { setOpen(!open); } };
    const handleAnchorKeyDown = (e: React.KeyboardEvent) => {
        if (trigger === "click" && (e.key === "Enter" || e.key === " ")) {
            e.preventDefault();
            setOpen(!open);
        }
    };

    return (
        <div className={clsx("popover")}>
            <div
                className={clsx("popover__anchor")}
                ref={setReferenceEl}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={handleClick}
                onKeyDown={handleAnchorKeyDown}
                aria-haspopup="dialog"
                aria-expanded={open}
                aria-controls={open ? contentId : undefined}
                style={props.anchorStyles}
            >{props.anchor}</div>
            {open && (
                <div
                    id={contentId}
                    className={clsx("popover__floating")}
                    role="dialog"
                    aria-modal="false"
                    tabIndex={-1}
                    ref={setFloatingEl}
                    data-placement={placement}
                    style={{ ...floatingStyles, ...props.contentStyles }}
                >
                    {props.content}
                </div>
            )}
        </div>
    )
}
