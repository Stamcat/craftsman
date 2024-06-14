import React from "react";
import styled, { css } from "styled-components";
import { color } from "../utilities/colors";
import { breakpoint, container, width } from "../utilities/layout";
import { Button } from "./Button";
import { Text } from "./Text";

export type ModalType = "dialog" | "panel";
export interface ModalProps extends React.ComponentPropsWithoutRef<"div"> {
    visible?: boolean;
    onPressBackground?: () => void;
    onDismiss?: () => void;
    $type?: ModalType;
    $header?: string;
    /** Hide/show the little x icon in the top right */
    $hideDismissIcon?: boolean;
    /** Footer element, put your action buttons here */
    $footer?: React.ReactNode;
}

const ModalWrapper = styled.div`
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    z-index: 1000;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const ModalBackground = styled.div`
    background-color: rgba(0, 0, 0, 0.5);
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: 1001;
`;
const mobileOnlyStyles = css`
    width: 100%;
`;
const panelTabletStyles = css`
    width: ${container(4)};
`;
const dialogTabletStyles = css`
    ${container(4, 6, 8)}
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
    ${breakpoint("mobileOnly", mobileOnlyStyles)}
    ${breakpoint("tablet", dialogTabletStyles)}
`;
const ModalContent = styled.div<{ $type: "dialog" | "panel" }>`
    padding: ${width("gutter", 2)};
    z-index: 1002;
    background-color: ${color("white")};
    max-height: 80vh;
    overflow-y: auto;
    ${(props) => props.$type === "panel" && panelStyles}
    ${(props) => props.$type === "dialog" && dialogStyles}
`;
const ModalHeader = styled.header`
    display: inline-flex;
    width: 100%;
    justify-content: flex-end;
    border-bottom: 1px solid ${color("greyLight")};
    margin-bottom: ${width("gutter")};
`;
const modalHeaderText = css`
    flex-grow: 1;
    margin-top: 0px;
`;
const modalCloseStyles = css`
    text-decoration: none;
    padding: 0 ${width("gutter", 0.3)} 0 ${width("gutter")};
`;
const ActionContainer = styled.footer`
    margin-top: ${width("gutter", 2)};
    padding: ${width("gutter", 1.5)} 0 0 0;
    background-color: ${color("white")};
    width: 100%;
    height: fit-content;
    display: flex;
    gap: ${width("gutter")};
    // left: 0;
`;
const ModalHeightContainer = styled.section``;
/**
 * Most frameworks over-complicate the Modal component. A modal should be simple: Some background element with a fixed element in the center of the screen. It should show or not show. What goes in the modal, and how it behaves is entirely up to you.
 * @param props
 * @returns
 * #__PURE__
 */
export const Modal: React.FC<ModalProps> = (props) => {
    if (!props.visible) {
        return null;
    }
    return (
        <ModalWrapper>
            <ModalContent $type={props.$type || "dialog"}>
                <ModalHeightContainer>
                    <ModalHeader>
                        {props.$header && (
                            <Text $type="h4" $bold $styles={modalHeaderText}>
                                {props.$header}
                            </Text>
                        )}
                        {!props.$hideDismissIcon === true && (
                            <Button $type="text" $label="X" $styles={modalCloseStyles} onClick={props.onDismiss} />
                        )}
                    </ModalHeader>
                    {props.children}
                </ModalHeightContainer>
                {props.$footer && <ActionContainer>{props.$footer}</ActionContainer>}
            </ModalContent>
            <ModalBackground onClick={props.onPressBackground} />
        </ModalWrapper>
    );
};
