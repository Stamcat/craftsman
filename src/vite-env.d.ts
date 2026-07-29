/// <reference types="vite/client" />

declare module "*.module.scss" {
    const classes: Record<string, string>;
    export default classes;
}

declare module "*.scss" {
    const content: string;
    export default content;
}

declare module "*.scss?inline" {
    const content: string;
    export default content;
}
