// eslint-disable-next-line eslint-comments/disable-enable-pair -- disabling this disable disable.
/* eslint-disable sonarjs/no-duplicate-string -- we allow duplicate strings here */
export interface Color {
    name: string;
    hex: string;
    rgba: string;
    hexGradient?: string[];
    rgbaGradient?: string[];
}
export type ColorValue = "rgba" | "hex";
export interface Colors {
    [name: string]: Color;
}
export const colors: Colors = {
    green: {
        name: "garden",
        hex: "#266431",
        rgba: "38,100,49,1",
    },
    greenOpacity10: {
        name: "gardenOpacity10",
        hex: "#EBFEF4",
        rgba: "38,100,49,.3",
    },
    greenOpacity30: {
        name: "gardenOpacity30",
        hex: "#266431",
        rgba: "38,100,49,.3",
    },
    greenOpacity80: {
        name: "gardenOpacity80",
        hex: "#c8d5c6",
        rgba: "38,100,49,.8",
    },
    greenSecondary: {
        name: "rosemary",
        hex: "#3A5137",
        rgba: "58,81,55,1",
    },
    greenDark: {
        name: "darkgreen",
        hex: "#1D4E26",
        rgba: "29,78,38,1",
    },
    greenDark2: {
        name: "darkgreen2",
        hex: "#035329",
        rgba: "3,83,51,1",
    },
    greenLink: {
        name: "link",
        hex: "#2A6F37",
        rgba: "42,111,55,1,1",
    },
    green2: {
        name: "green2",
        hex: "#057F3E",
        rgba: "5,127,62,1",
    },
    green3: {
        name: "green3",
        hex: "#22592B",
        rgba: "34,89,43,1",
    },
    green4: {
        name: "green4",
        hex: "#183A1E",
        rgba: "24,58,30,1",
    },
    greenTertiary: {
        name: "bay",
        hex: "#3B9187",
        rgba: "34,73,69,1",
    },
    greenLight: {
        name: "succulent",
        hex: "#E5FFC5",
        rgba: "229,255,197,1",
    },

    greenLight2: {
        name: "lightgreen",
        hex: "#D1DAD2",
        rgba: "209,218,210,1",
    },

    greenMint: {
        name: "mintgreen",
        hex: "#EBFEF4",
        rgba: "235,254,244",
    },
    turquoise: {
        name: "lake",
        hex: "#3B9187",
        rgba: "59,145,135,1",
    },
    blueSecondary: {
        name: "laguna",
        hex: "#2F7CA7",
        rgba: "47,124,167,1",
    },
    blueTertiary: {
        name: "blueberry",
        hex: "#4A28A9",
        rgba: "74,40,189,1",
    },

    blueDark: {
        name: "darkblue",
        hex: "#084782",
        rgba: "8,71,130,1",
    },
    blue: {
        name: "blue",
        hex: "#0C6FCA",
        rgba: "12,111,202,1",
    },
    blueVeryLight: {
        name: "verylightblue",
        hex: "#ECF5FE",
        rgba: "236,245,254,1",
    },
    blueUltraLight: {
        name: "rain",
        hex: "#F0FEFF",
        rgba: "240,254,255,1",
    },
    yellow: {
        name: "creme",
        hex: "#FFF6A6",
        rgba: "224,246,166,1",
    },
    orange: {
        name: "pumpkin",
        hex: "#E0A32C",
        rgba: "224,163,44,1",
    },
    redLight: {
        name: "pink",
        hex: "#FDEDF1",
        rgba: "253,237,241,1",
    },
    red: {
        name: "red",
        hex: "#D11A45",
        rgba: "209,26,69,1",
    },
    redTertiary: {
        name: "papaya",
        hex: "#D35C4D",
        rgba: "211,92,77,1",
    },
    redDark: {
        name: "darkred",
        hex: "#8D112E",
        rgba: "141,17,46,1",
    },

    blackTertiary: {
        name: "nightsky",
        hex: "#0D1320",
        rgba: "13,19,32,1",
    },
    black: {
        name: "black",
        hex: "#0D1320",
        rgba: "13,19,32,1",
    },
    almostBlack: {
        name: "almostblack",
        hex: "#121212",
        rgba: "18,18,18,1",
    },
    gray5: {
        name: "gray500",
        hex: "#55544F",
        rgba: "85,84,79,1",
    },
    gray4: {
        name: "gray400",
        hex: "#74736E",
        rgba: "116,115,110,1",
    },
    gray4Opacity50: {
        name: "gray400Opacity50",
        hex: "#74736E",
        rgba: "116,115,110,0.5",
    },
    gray3: {
        name: "gray300",
        hex: "#BFBDB6",
        rgba: "191,189,182,1",
    },
    gray2: {
        name: "gray200",
        hex: "#E0DFD9",
        rgba: "244,223,217,1",
    },
    gray1: {
        name: "gray100",
        hex: "#F9F8F4",
        rgba: "249,248,244,1",
    },
    gradientWhite: {
        name: "whitegradient",
        hex: "#FFFFFF",
        rgba: "255,255,255,1",
        hexGradient: ["#FFFFFF", "#FAF9F6"],
        rgbaGradient: ["255,255,255,1", "250,249,246,1"],
    },
    gradientOverlay: {
        name: "overlay",
        hex: "#FFFFFF",
        rgba: "255,255,255,1",
        rgbaGradient: ["19,19,32,0", "19,19,32,0.54"],
    },
    white: {
        name: "white",
        hex: "#FFFFFF",
        rgba: "255,255,255,1",
    },
    visaDark: {
        name: "visadark",
        hex: "#001C4B",
        rgba: "0,28,75,1",
    },
    visa: {
        name: "visa",
        hex: "#002D79",
        rgba: "0,45,121,1",
    },
    discoverDark: {
        name: "discoverdark",
        hex: "#D34406",
        rgba: "211,68,6,1",
    },
    discover: {
        name: "discover",
        hex: "#F6A001",
        rgba: "246,160,1,1",
    },
    mastercardDark: {
        name: "mastercarddark",
        hex: "#BB0015",
        rgba: "187,0,21,1",
    },
    mastercard: {
        name: "mastercard",
        hex: "#EB2A00",
        rgba: "235,42,0,1",
    },
    amexDark: {
        name: "amexdark",
        hex: "#005398",
        rgba: "0,83,152,1",
    },
    amex: {
        name: "amex",
        hex: "#0071CE",
        rgba: "0,113,206,1",
    },
    ccDark: {
        name: "ccdark",
        hex: "#3A5137",
        rgba: "58,81,55,1",
    },
    cc: {
        name: "cc",
        hex: "#3B9187",
        rgba: "59,145,135,1",
    },
    strawberry: {
        name: "strawberry",
        hex: "#C6659F",
        rgba: "198,101,159,1",
    },
    mint: {
        name: "mint",
        hex: "#C6659F",
        rgba: "147,183,146,1",
    },
    mixedBerry: {
        name: "mixedberry",
        hex: "#C1A7B0",
        rgba: "193,167,176,1",
    },
    chocolate: {
        name: "chocolate",
        hex: "#A66E54",
        rgba: "166,110,84,1",
    },
    darkChocolate: {
        name: "darkchocolate",
        hex: "#5E3E10",
        rgba: "94,62,16,1",
    },
    pineapple: {
        name: "pineapple",
        hex: "#FCF195",
        rgba: "252,241,149,1",
    },
    honey: {
        name: "honey",
        hex: "#F5EC9A",
        rgba: "245,236,154,1",
    },
    chamomile: {
        name: "chamomile",
        hex: "#FFE7BA",
        rgba: "255,231,186,1",
    },
    coconut: {
        name: "coconut",
        hex: "#E2ECF3",
        rgba: "226,236,243,1",
    },
    creme: {
        name: "creme",
        hex: "#E2E2E2",
        rgba: "226,226,226,1",
    },
    greenTea: {
        name: "greentea",
        hex: "#A9DB82",
        rgba: "169,219,130,1",
    },
    aloe: {
        name: "aloe",
        hex: "#5D7E3C",
        rgba: "93,126,60,1",
    },
};

// allows us to specify color by key or by name
/* #__PURE__ */
export const color = (name: string, type: ColorValue = "hex"): string => {
    // default
    let value = colors.almostBlack.hex;
    if (colors[name]) {
        value = colors[name][type];
    } else {
        for (const key of Object.keys(colors)) {
            if (colors[key].name === name) {
                value = colors[key][type];
            }
        }
    }
    return value;
};

export function colorWithAlpha(name: string, typeOrAlpha?: number): string {
    const hex = colors[name]?.hex || colors.almostBlack.hex;
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${typeOrAlpha})`;
}
