import styled from "@emotion/styled"
import { loaders, type LoaderStyle } from "../styles/global/components/loaders";
import styles from "../styles/global/components/loaders.module.scss";
import type { SerializedStyles } from "@emotion/react";

const StyledLoader = styled.div<{ type: LoaderStyle, color: string, width?: number, styles?: SerializedStyles }>`
    ${(props) => loaders[props.type](props.color, props.width)}
    ${(props) => props.styles}
`;

export type LoaderProps = React.ComponentProps<"div"> & {
    type: LoaderStyle;
    color?: string;
    width?: number;
    styles?: SerializedStyles;
}

/**
 * Loaders are pure CSS picked from https://css-loaders.com/ <br />
 * For simplicity, we stick to one primary color & use gray/white as an alternate. <br />
 * We've adjusted the style values to dynamically change based on your inputs.<br />
 * We intend to expand selections in the future
 */
export const Loader: React.FC<LoaderProps> = (props) => {
    const { type, color = "black", ...rest } = props; 
    return (
        <StyledLoader className={styles[type]} type={type} color={color || "black"} {...rest} />

    )
}
