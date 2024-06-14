/**
 * This is a registry of remote components that have been loaded into the DOM.
 * This can be added to redux if needed, but doesn't need to be at this time.
 */
const registry: string[] = [];

export const ComponentRegistry = {
    add: (name: string) => {
        registry.push(name);
    },
    check: (name: string) => {
        return registry.includes(name);
    },
};
