import React from "react";
import styled, { css } from "styled-components";
import { breakpoint, container, width } from "../utilities/layout";
import { RuleSet } from "styled-components/dist/types";

type PositionType = "topRight" | "inline";

interface NotificationPanelProps extends React.ComponentPropsWithoutRef<"code"> {
    position?: PositionType;
    children?: React.ReactNode;
    styles?: RuleSet<object>;
}
const fixedStyles = css`
    position: fixed;
    z-index: 1000;
    ${container(4)};
`;
const topRightStypes = css`
    top: ${width("gutter", 2)};
    right: ${width("gutter", 2)};
    ${breakpoint("tablet", fixedStyles)}
`;
const Panel = styled.div<{ $position: PositionType; $styles: RuleSet<object> }>`
    > *:nth-child(1n + 2) {
        margin-top: ${width("gutter", 0.5)};
    }
    ${(props) => props.$position === "topRight" && topRightStypes}
    ${(props) => props.$styles}
`;
/* #__PURE__ */
export const NotificationPanel: React.FC<NotificationPanelProps> = (props) => {
    return (
        <Panel $position={props.position || "inline"} $styles={props.styles || css``}>
            {props.children}
        </Panel>
    );
};
