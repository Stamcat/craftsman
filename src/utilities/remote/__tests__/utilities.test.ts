import { findRemoteUrl } from "../utilities";

describe("remote utilities", () => {
    describe("findRemoteUrl", () => {
        it("returns remote url of the object", () => {
            const rem = findRemoteUrl("testURL", { testURL: "testURL" });
            expect(rem).toBe("testURL");
        });
    });
});
