import { z } from "zod";

export type RemoteConfig = {
    remoteName: string;
    remoteHost: string;
    componentName: string;
};

export const ZRemoteConfig = z.object({
    remoteName: z.string(),
    remoteHost: z.string().default("/"),
    componentName: z.string(),
});
