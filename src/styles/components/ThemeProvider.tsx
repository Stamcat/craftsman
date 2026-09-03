import { themeBuilder } from "../theme/theme";
import type { Theme } from "../theme/types";

type ThemeProviderProps = {
    theme?: Theme;
    children?: React.ReactNode;
    /** Default: "high" - Set to false to opt out of React's style hoisting */
    precedence?: string | false;
    href?: string;
    /** Default: true - Set false to declare your own layer ordering */
    layered?: boolean;
};

export function ThemeProvider({
    theme,
    children,
    precedence = "high",
    href = "stamcat-craftsman-theme-provider",
    layered = true,
}: ThemeProviderProps) {
    const themeStyles = themeBuilder(theme || {}, { layered });

    return (
        <>
            <style
                {...(precedence !== false ? { precedence, href } : {})}
                dangerouslySetInnerHTML={{ __html: themeStyles }}
            />
            {children}
        </>
    );
}
