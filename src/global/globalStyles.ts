import { DefaultTheme, createGlobalStyle } from "styled-components";
import { anchor } from "./styles/anchor";
import { typography } from "./styles/typography";
import { input } from "./styles/input";
import { list } from "./styles/list";
import { code } from "./styles/code";
import { blockquote } from "./styles/blockquote";
import { article } from "./styles/article";
import { abbr } from "./styles/abbr";
import { button } from "./styles/button";
import { hr } from "./styles/hr";
import { select } from "./styles/select";
import { fieldset } from "./styles/fieldset";
import "./styles/fonts.css";

/* #__PURE__ */
export const GlobalStyles = createGlobalStyle<{ theme?: DefaultTheme }>`
     ${typography}
    ${list}
    ${input}
    ${anchor}
    ${code}
    ${blockquote}
    ${article}
    ${abbr}
    ${button}
    ${hr}
    ${select}
    ${fieldset}
`;
