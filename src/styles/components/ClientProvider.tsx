import { Global } from "@emotion/react";
import { globalStyles } from "../global/globalStyles";
import { CraftsmanThemeProvider, themeBuilder } from "../theme/theme";
import { setCraftsmanConfig } from "../utilities/config";
import type { CraftsmanStyleConfig } from "../utilities/types";
import type { Theme } from "../theme/types";

type ClientProviderProps = {
    /** Base configuration variables */
    config?: CraftsmanStyleConfig;
    theme?: Theme;
    children?: React.ReactNode;
};

export function ClientProvider(props: ClientProviderProps) {
    /**
     * (optional) css-in-js: Custom configurations will generate new variables at app entry
     */
    if (props.config) {
        setCraftsmanConfig(props.config);
    }

    return (
        <CraftsmanThemeProvider theme={props.theme || {}}>
            <Global styles={(theme) => [globalStyles, themeBuilder(theme as Theme)]} />
            {props.children}
        </CraftsmanThemeProvider>
    );
};
