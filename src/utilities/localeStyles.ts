export type Style = Record<string, unknown>;

/**
 * This is a simple dictionary of styles associated with any key name you like.
 * You can set any key name to be used for any set of style properties you need
 * For eample:
 * "es-SP": {
 *  roPBStyles: {
 *      color: "green",
 *      lineHeight: "20px",
 *  }
 * }
 * Then in your component styles, you'd call
 * ${getLocaleStyles("roPBStyles", props.localeStyles)}
 *
 * The second argument is not mandatory,
 * however it is preferable as the i18n module may not be loaded by the time your styles are needed
 */
export const localeStyles: Record<string, Style> = {
    "th-TH": {
        fontFamily: "Noto Sans Thai",
        h1: {
            lineHeight: "56px",
        },
        h2: {
            lineHeight: "42px",
        },
        h3: {
            lineHeight: "36px",
        },
        h4: {
            lineHeight: "30px",
        },
        h5: {
            lineHeight: "22px",
        },
        h6: {
            lineHeight: "20px",
        },
        body: {
            lineHeight: "22px",
        },
        small: {
            lineHeight: "18px",
        },
        body2: {
            lineHeight: "26px",
        },
        xSmall: {
            lineHeight: "16px",
        },
    },
    "km-KH": {
        h1: {
            lineHeight: "64px",
        },
        h2: {
            lineHeight: "44px",
        },
        h3: {
            lineHeight: "38px",
        },
        h4: {
            lineHeight: "32px",
        },
        h5: {
            lineHeight: "26px",
        },
        h6: {
            lineHeight: "22px",
        },
        body: {
            lineHeight: "24px",
        },
        small: {
            lineHeight: "20px",
        },
        body2: {
            lineHeight: "28px",
        },
        xSmall: {
            lineHeight: "18px",
        },
    },
};

/**
 *
 * @param key Key of the style you want returned
 * @param locale currently selected locale
 */
/* #__PURE__ */
export const getLocaleStyles = (key: string, locale: string) => {
    const activeLocale = locale;
    if (!activeLocale || !localeStyles[activeLocale] || !localeStyles[activeLocale][key]) {
        return {};
    }
    return localeStyles[activeLocale][key];
};
