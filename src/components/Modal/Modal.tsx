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

/**
 * Most frameworks over-complicate the Modal component. 
 * A modal should be simple: Some background element with a fixed element in the center of the screen. 
 * It should show or not show. What goes in the modal, and how it behaves is entirely up to you.
 */
export class Modal extends React.PureComponent<ModalProps, ModalState> {
    readonly state: ModalState = { isClosing: false }; 
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
                >
                    <header>
                        {this.props.header && (
                            <>{this.props.header}</>
                        )}
                        {!this.props.hideDismissIcon === true && (
                            <Button variant="primary" className={"closeModal"} onClick={this.onDismiss}><LuX fill={color("white")} size={18} /></Button>
                        )}
                    </header>
                    <section>
                        {this.props.children}
                    </section>
                    {this.props.footer && <footer className={"actionContainer"}>{this.props.footer}</footer>}
                </div>
                <div className={"background"} data-is-closing={this.state.isClosing} onClick={this.onClickBackground} />
            </div>
        );
    }
};

