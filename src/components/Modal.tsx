import React from "react";
import { Button } from "./Button";
import styled from "@emotion/styled";
import { css, keyframes, type SerializedStyles } from "@emotion/react";
import { breakpoint } from "../styles/utilities/layout";
import { LuX } from "react-icons/lu";
import { color } from "../styles/utilities/color";

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
    /** Custom styles apply to outer wrapper so that you can access selectors within */
    styles?: SerializedStyles;
}
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;
const slideIn = keyframes`
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
`;

const slideOut = keyframes`
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(100%);
  }
`;
const ModalWrapper = styled.div<{styles?: SerializedStyles}>`
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 1000;
    display: flex;
    justify-content: center;
    align-items: center;
    ${(props) => props.styles}
`;
const ModalBackground = styled.div<{isClosing: boolean}>`
    background-color: rgba(0, 0, 0, 0.5);
    animation: ${(props) => (props.isClosing ? fadeOut : fadeIn)} 0.3s ease-in-out;
    animation-fill-mode: forwards;
     position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 1001;
`;
const mobileOnlyStyles = css`
    width: 100%;
    height: 100%;
`;
const panelTabletStyles = css`
    width: calc(var(--w-column) * 4);
`;
const dialogTabletStyles = css`
    width: calc(var(--w-column) * 4);
    ${breakpoint("tablet", css`
        width: calc(var(--w-column) * 6);
    `)}
    ${breakpoint("desktop", css`
        width: calc(var(--w-column) * 8);
    `)}
`;
const panelStyles = css`
    position: fixed;
    top: 0;
    right: 0;
    height: 100%;
    ${breakpoint("mobileOnly", mobileOnlyStyles)}
    ${breakpoint("tablet", panelTabletStyles)}
`;
const dialogStyles = css`
    border-radius: 8px;
    ${breakpoint("mobileOnly", mobileOnlyStyles)}
    ${breakpoint("tablet", dialogTabletStyles)}
`;
const ModalContent = styled.div<{ type: "dialog" | "panel", isClosing: boolean }>`
    padding: calc(var(--w-gutter));
    z-index: 1002;
    background-color: var(--white);
    max-height: 80vh;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    touch-action: pan-y;
    animation: ${(props) => (props.isClosing ? slideOut : slideIn)} 0.3s ease-in-out;
    animation-fill-mode: forwards;
    ${(props) => props.type === "panel" && panelStyles}
    ${(props) => props.type === "dialog" && dialogStyles}
    header {
        display: inline-flex;
        width: 100%;
        justify-content: space-between;
        margin-bottom: calc(var(--w-gutter) * 0.5);
    }
`;

const modalCloseStyles = css`
    text-decoration: none;
    height: 36px;
    width: 36px;
    border-radius: 50%;
`;
const ActionContainer = styled.footer`
    margin-top: calc(var(--w-gutter) * 2);
    background-color:var(--white);
    height: fit-content;
    display: flex;
    gap: var(--w-gutter);
`;

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
        const dismissible = this.props.backgroundDismiss || true;
        if (dismissible === true) {
            this.onDismiss();
        }
    }
    public render() {
        if (!this.props.visible) {
            return <></>;
        }
        return (
            <ModalWrapper styles={this.props.styles}>
                <ModalContent type={this.props.type || "dialog"} isClosing={this.state.isClosing}>
                    <header>
                        {this.props.header && (
                            <>{this.props.header}</>
                        )}
                        {!this.props.hideDismissIcon === true && (
                            <Button variant="primary" styles={modalCloseStyles} onClick={this.onDismiss}><LuX fill={color("white")} viewBox="6 8 14 14" size={24} /></Button>
                        )}
                    </header>
                    <section>
                        {this.props.children}
                    </section>
                    {this.props.footer && <ActionContainer>{this.props.footer}</ActionContainer>}
                </ModalContent>
                <ModalBackground isClosing={this.state.isClosing} onClick={this.onClickBackground} />
            </ModalWrapper>
        );
    }
};

