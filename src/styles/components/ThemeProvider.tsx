import { themeBuilder } from "../theme/theme";
import type { Theme } from "../theme/types";

type ThemeProviderProps = {
    theme?: Theme;
    children?: React.ReactNode;
    precedence?: string;
    href?: string;
};

export function ThemeProvider({
    theme,
    children,
    precedence = "default",
    href = "stamcat-craftsman-theme-provider",
}: ThemeProviderProps) {
    const resolvedTheme = theme || {};
    const themeStyles = themeBuilder(resolvedTheme);

    return (
        <>
            <style
                precedence={precedence}
                href={href}
                dangerouslySetInnerHTML={{ __html: themeStyles }}
            />
            {children}
        </>
    );
}
