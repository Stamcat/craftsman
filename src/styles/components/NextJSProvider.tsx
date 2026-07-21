"use client";

import createCache from "@emotion/cache";
import { CacheProvider, Global } from "@emotion/react";
import { CraftsmanThemeProvider, themeBuilder } from "../theme/theme";
import type { Theme } from "../theme/types";
import { globalStyles } from "../global/globalStyles";
import { useServerInsertedHTML } from "next/navigation";
import { useState } from "react";

type StyleProviderProps = {
    key?: string;
    children?: React.ReactNode;
    theme?: Theme;
};

type StyleProviderState = {
    cache: ReturnType<typeof createCache>;
    flush: () => string[];
};

export function NextJSProvider({ children, key = "app", theme }: StyleProviderProps) {
  const [{ cache, flush }] = useState<StyleProviderState>(() => {
    const emotionCache = createCache({ key });
    emotionCache.compat = true;

    const prevInsert = emotionCache.insert;
    let inserted: string[] = [];

    emotionCache.insert = (...args) => {
      const serialized = args[1];
      if (emotionCache.inserted[serialized.name] === undefined) {
        inserted.push(serialized.name);
      }
      return prevInsert(...args);
    };

    const flushInserted = () => {
      const prevInserted = inserted;
      inserted = [];
      return prevInserted;
    };

    return { cache: emotionCache, flush: flushInserted };
  });

  useServerInsertedHTML(() => {
    const names = flush();

    if (names.length === 0) {
      return null;
    }

    let styles = "";
    for (const name of names) {
      styles += cache.inserted[name];
    }

    return (
      <style
        data-emotion={`${cache.key} ${names.join(" ")}`}
        dangerouslySetInnerHTML={{ __html: styles }}
      />
    );
  });

  return (
    <CacheProvider value={cache}>
      <CraftsmanThemeProvider theme={theme || {}}>
        <Global styles={(t) => [globalStyles, themeBuilder(t as Theme)]} />
        {children}
      </CraftsmanThemeProvider>
    </CacheProvider>
  );
}
