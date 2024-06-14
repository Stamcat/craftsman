import React from "react";
import styled from "styled-components";
import { color } from "../utilities/colors";
import { width } from "../utilities/layout";

interface CodeProps extends React.ComponentPropsWithoutRef<"code"> {}

const CodeWrapper = styled.pre`
    overflow: scroll;
    background: ${color("nightsky")};
    color: ${color("gray2")};
    padding: ${width("gutter")};
    border-radius: 6px;
`;
/**
 * Renders a pre tag with a <code>code tag</code> as a child and applies standard sizes.
 * @param props
 * @returns
 * #__PURE__
 */
export const Code: React.FC<CodeProps> = (props) => {
    return (
        <CodeWrapper>
            <code>{props.children}</code>
        </CodeWrapper>
    );
};
