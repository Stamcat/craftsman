import { ComponentRegistry } from "../registry";

describe("component registry", () => {
    it("adds a new entry to registry, and checks to see if it exists", () => {
        ComponentRegistry.add("TestComponent");
        const retrieved = ComponentRegistry.check("TestComponent");
        const missing = ComponentRegistry.check("nope");
        expect(retrieved).toBe(true);
        expect(missing).toBe(false);
    });
});
