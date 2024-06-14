import React from "react";
import styled, { css } from "styled-components";
import { breakpoint, container, gutter } from "../utilities/layout";
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
    top: ${gutter(2)};
    right: ${gutter(2)};
    ${breakpoint("tablet", fixedStyles)}
`;
const Panel = styled.div<{ $position: PositionType; $styles: RuleSet<object> }>`
    > *:nth-child(1n + 2) {
        margin-top: ${gutter(0.5)};
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
