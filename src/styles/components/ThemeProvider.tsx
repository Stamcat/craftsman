import "../global/globalStyles";
import { themeBuilder } from "../theme/theme";
import type { Theme } from "../theme/types";

type ThemeProviderProps = {
    theme?: Theme;
    children?: React.ReactNode;
};

export function ThemeProvider({ theme, children }: ThemeProviderProps) {
    const resolvedTheme = theme || {};
    const themeStyles = themeBuilder(resolvedTheme);

    return (
        <>
            <style dangerouslySetInnerHTML={{ __html: themeStyles }} />
            {children}
        </>
    );
}
