"use client";

import React from "react";
import { Button } from "../Button/Button";
import { LuX } from "react-icons/lu";
import { color } from "../../styles/utilities/color";
import "./Modal.scss";
import clsx from "clsx";

export type ModalType = "dialog" | "panel";
export interface ModalProps extends React.ComponentPropsWithoutRef<"div"> {
    visible?: boolean;
    onDismiss?: () => void;
    type?: ModalType;
    header?: string | React.ReactNode;
    /** Click background to dismiss modal (default: true) */
    backgroundDismiss?: boolean;
    /** Hide/show the little x icon in the top right */
    hideDismissIcon?: boolean;
    /** Footer element, put your action buttons here */
    footer?: React.ReactNode;
}

type ModalState = {
    isClosing: boolean;
};

const FOCUSABLE_SELECTOR = 'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Most frameworks over-complicate the Modal component. 
 * A modal should be simple: Some background element with a fixed element in the center of the screen. 
 * It should show or not show. What goes in the modal, and how it behaves is entirely up to you.
 */
export class Modal extends React.PureComponent<ModalProps, ModalState> {
    readonly state: ModalState = { isClosing: false };
    private contentRef = React.createRef<HTMLDivElement>();
    private lastFocused: HTMLElement | null = null;

    public componentDidMount() {
        if (this.props.visible) {
            this.lastFocused = document.activeElement as HTMLElement | null;
            this.contentRef.current?.focus();
            document.addEventListener("keydown", this.onKeyDown);
        }
    }

    public componentDidUpdate(prevProps: ModalProps) {
        if (this.props.visible && !prevProps.visible) {
            this.lastFocused = document.activeElement as HTMLElement | null;
            this.contentRef.current?.focus();
            document.addEventListener("keydown", this.onKeyDown);
        } else if (!this.props.visible && prevProps.visible) {
            document.removeEventListener("keydown", this.onKeyDown);
            this.lastFocused?.focus();
        }
    }

    public componentWillUnmount() {
        document.removeEventListener("keydown", this.onKeyDown);
    }

    private onKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
            this.onDismiss();
            return;
        }
        if (e.key !== "Tab") { return; }
        const content = this.contentRef.current;
        if (!content) { return; }
        const focusable = Array.from(content.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR));
        if (focusable.length === 0) {
            e.preventDefault();
            content.focus();
            return;
        }
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
        }
    };

    public onDismiss = () => {
        if (this.props.onDismiss) {
            this.setState({isClosing: true});
                setTimeout(() => {
                    if (this.props.onDismiss) {
                        this.props.onDismiss();
                    }
                    this.setState({isClosing: false});
            }, 280);
        }
    };
    public onClickBackground = () => {
        const dismissible = this.props.backgroundDismiss ?? true;
        if (dismissible === true) {
            this.onDismiss();
        }
    }
    public render() {
        const modalType = this.props.type || "dialog";

        if (!this.props.visible) {
            return <></>;
        }
        const classNames = clsx("modal", "wrapper", this.props.className);
        return (
            <div className={classNames} style={this.props.style}>
                <div
                    className={clsx("content", modalType)}
                    data-is-closing={this.state.isClosing}
                    role="dialog"
                    aria-modal="true"
                    aria-label={typeof this.props.header === "string" ? this.props.header : "Dialog"}
                    tabIndex={-1}
                    ref={this.contentRef}
                >
                    <header>
                        {this.props.header && (
                            <>{this.props.header}</>
                        )}
                        {!this.props.hideDismissIcon === true && (
                            <Button variant="primary" className={"closeModal"} onClick={this.onDismiss} aria-label="Close">
                                <LuX fill={color("white")} size={18} aria-hidden="true" />
                            </Button>
                        )}
                    </header>
                    <section>
                        {this.props.children}
                    </section>
                    {this.props.footer && <footer className={"actionContainer"}>{this.props.footer}</footer>}
                </div>
                <div className={"background"} role="presentation" aria-hidden="true" data-is-closing={this.state.isClosing} onClick={this.onClickBackground} />
            </div>
        );
    }
};


