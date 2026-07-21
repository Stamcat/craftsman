import { Global } from "@emotion/react";
import { globalStyles } from "../global/globalStyles";
import { CraftsmanThemeProvider, themeBuilder } from "../theme/theme";
import type { Theme } from "../theme/types";

type ClientProviderProps = {
    theme?: Theme;
    children?: React.ReactNode;
};

export function ClientProvider(props: ClientProviderProps) {
    return (
        <CraftsmanThemeProvider theme={props.theme || {}}>
            <Global styles={(theme) => [globalStyles, themeBuilder(theme as Theme)]} />
            {props.children}
        </CraftsmanThemeProvider>
    );
};
