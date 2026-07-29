import * as exportedComponents from "../../components/index";
import { htmlTagNames } from "./constants";

type ExportedComponentName = keyof typeof exportedComponents & string;
export type RegisteredComponentName = Uncapitalize<ExportedComponentName>;

type SelectorMap = Partial<Record<RegisteredComponentName, string>>;

const componentSelectorTargets: SelectorMap = {
    button: "button",
    input: "input:not([type='radio']):not([type='checkbox'])",
    checkbox: "input[type='checkbox']",
    radioButton: "input[type='radio']",
};

function toRegisteredComponentName(componentName: string): RegisteredComponentName {
    return (componentName.charAt(0).toLowerCase() + componentName.slice(1)) as RegisteredComponentName;
}

function toComponentSelector(componentName: RegisteredComponentName) {
    const mappedTarget = componentSelectorTargets[componentName];
    if (mappedTarget) {
        return mappedTarget;
    }

    return htmlTagNames.has(componentName) ? `${componentName}, .${componentName}` : `.${componentName}`;
}

const componentNames = (Object.keys(exportedComponents) as ExportedComponentName[]).map(toRegisteredComponentName);

export const componentSelectors = Object.fromEntries(
    componentNames.map((componentName) => [componentName, toComponentSelector(componentName)]),
) as Record<RegisteredComponentName, string>;
