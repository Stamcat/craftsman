import React from "react";
import { ThemeProvider, StyleSheetManager, DefaultTheme } from "styled-components";

type Props = {
    theme: DefaultTheme;
    children: React.ReactNode;
};

/* #__PURE__ */
export const StyleProvider = ({ theme, children }: Props) => {
    return (
        <StyleSheetManager>
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </StyleSheetManager>
    );
};
