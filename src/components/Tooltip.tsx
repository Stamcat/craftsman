import React from "react";
import styled, { RuleSet } from "styled-components";

const TooltipText = styled.div``;
type TooltipBoxProps = {
    $visible: boolean;
    $styles?: RuleSet<object>;
};
const TooltipBox = styled.div<TooltipBoxProps>`
    position: absolute;
    top: calc(100% + 10px);
    // left: 30px;
    color: transparent;
    background-color: transparent;
    width: 150px;
    padding: 5px 5px;
    border-radius: 4px;
    // transition: visibility 0.5s, color 0.5s, background-color 0.5s, width 0.5s, padding 0.25s ease-in-out;
    background-color: rgba(0, 0, 0, 0.8);
    color: #fff;
    padding: 8px 8px;
    &:before {
        content: "";
        width: 0;
        height: 0;
        left: 40px;
        top: -10px;
        position: absolute;
        border: 10px solid transparent;
        transform: rotate(135deg);
        // transition: border 0.3s ease-in-out;
        border-color: transparent transparent rgba(0, 0, 0, 0.8) rgba(0, 0, 0, 0.8);
    }
    visibility: ${(props) => (props.$visible ? "visible" : "hidden")};
    ${(props) => props.$styles};
`;
const TooltipCard = styled.div`
    position: relative;
    /* & ${TooltipText}:hover + ${TooltipBox} {
        color: #fff;
        background-color: rgba(0, 0, 0, 0.8);
        padding: 8px 8px;
        &:before {
            border-color: transparent transparent rgba(0, 0, 0, 0.8) rgba(0, 0, 0, 0.8);
        }
    } */
`;
export type TooltipProps = {
    /** Element that invokes the tooltip display */
    trigger: React.ReactNode;
    /** Content of the tooltip */
    children?: React.ReactNode;
    /** Visibility control */
    visible: boolean;
    /** Add custom styles */
    $styles?: RuleSet<object>;
};
/**
 * TODO: This needs to be much more customizable, with transitions and positioning controls. We're leaving code commented in here to help give ideas on a long term solution
 * @param children
 * @param visible
 * @param $styles
 * @returns
 */
export const Tooltip: React.FC<TooltipProps> = ({ children, visible, $styles, trigger }: TooltipProps) => {
    return (
        <>
            <TooltipCard>
                <TooltipText>{trigger}</TooltipText>
                <TooltipBox $visible={visible} $styles={$styles}>
                    {children}
                </TooltipBox>
            </TooltipCard>
        </>
    );
};
