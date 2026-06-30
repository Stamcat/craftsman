import * as exportedComponents from "../../components";

type ExportedComponentName = keyof typeof exportedComponents & string;
export type RegisteredComponentName = Uncapitalize<ExportedComponentName>;

function toRegisteredComponentName(componentName: string): RegisteredComponentName {
    return (componentName.charAt(0).toLowerCase() + componentName.slice(1)) as RegisteredComponentName;
}

const componentNames = (Object.keys(exportedComponents) as ExportedComponentName[]).map(toRegisteredComponentName);

export const componentSelectors = Object.fromEntries(
    componentNames.map((componentName) => [componentName, componentName]),
) as Record<RegisteredComponentName, string>;
