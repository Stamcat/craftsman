import * as exportedComponents from "../../components/index";
import { htmlTagNames } from "./constants";

type ExportedComponentName = keyof typeof exportedComponents & string;
export type RegisteredComponentName = Uncapitalize<ExportedComponentName>;

function toRegisteredComponentName(componentName: string): RegisteredComponentName {
    return (componentName.charAt(0).toLowerCase() + componentName.slice(1)) as RegisteredComponentName;
}

function toComponentSelector(componentName: RegisteredComponentName) {
    return htmlTagNames.has(componentName) ? componentName : `.${componentName}`;
}

const componentNames = (Object.keys(exportedComponents) as ExportedComponentName[]).map(toRegisteredComponentName);

export const componentSelectors = Object.fromEntries(
    componentNames.map((componentName) => [componentName, toComponentSelector(componentName)]),
) as Record<RegisteredComponentName, string>;
