import { themeBuilder } from "../theme/theme";
import type { Theme } from "../theme/types";

type ThemeProviderProps = {
    theme?: Theme;
    children?: React.ReactNode;
    precedence?: string;
    href?: string;
    /**
     * Whether the runtime theme CSS is wrapped in the `craftsman-theme` cascade
     * layer. Defaults to true. Set to false if your app declares its own
     * `@layer` order and needs these theme overrides to always win regardless
     * of it - see `ThemeBuilderOptions.layered` for why this is necessary.
     */
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
                precedence={precedence}
                href={href}
                dangerouslySetInnerHTML={{ __html: themeStyles }}
            />
            {children}
        </>
    );
}
