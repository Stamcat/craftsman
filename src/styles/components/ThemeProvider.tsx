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
    precedence = "high",
    href = "stamcat-craftsman-theme-provider",
}: ThemeProviderProps) {
    const themeStyles = themeBuilder(theme || {});

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
