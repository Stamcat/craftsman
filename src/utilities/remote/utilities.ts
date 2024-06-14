import React from "react";
import { ComponentRegistry } from "./registry";

export const findRemoteUrl = (remoteName: string, remotes: Record<string, string>): string => {
    const remote = remotes[remoteName];
    return remote || "";
};

export const fetchRemote = (url: string, remoteName: string) =>
    new Promise((resolve, reject) => {
        // We define a script tag to use the browser for fetching the remoteEntry.js file
        const script = document.createElement("script");
        script.src = url;
        script.onerror = () => {
            reject(new Error(`Failed to fetch remote: ${remoteName} from url: ${url}`));
        };
        // When the script is loaded we need to resolve the promise back to Module Federation
        script.onload = () => {
            // The script is now loaded on window using the name defined within the remote
            const proxy = {
                // @ts-expect-error -- this uses browser built in functionality
                get: (request: string) => window[remoteName as never].get(request),
                // eslint-disable-next-line consistent-return -- return or reject is ok here
                init: (arg: unknown) => {
                    try {
                        // @ts-expect-error -- this uses browser built in functionality
                        return window[remoteName as never].init(arg);
                    } catch (e) {
                        reject(e);
                    }
                },
            };
            resolve(proxy);
        };
        // Lastly we inject the script tag into the document's head to trigger the script load
        document.head.appendChild(script);
    });

export const loadComponent =
    (remoteHost: string, remoteName: string, moduleName: string, fallback?: React.ReactElement, scope = "default") =>
    async () => {
        try {
            if (!window[remoteName as never] && !ComponentRegistry.check(moduleName)) {
                // add to registry
                ComponentRegistry.add(moduleName);
                // Need to load the remote first
                // Initializes the shared scope. Fills it with known provided modules from this build and all remotes
                // @ts-expect-error -- uses internal webpack functionality
                // eslint-disable-next-line no-undef -- this calls for webpack
                await __webpack_init_sharing__(scope); // TODO when would you use a different scope?
                const url = `${remoteHost}${remoteName}/remoteEntry.js`;
                const fetchedContainer = await fetchRemote(url, remoteName);
                // @ts-expect-error -- uses internal webpack functionality
                // eslint-disable-next-line no-undef -- this is a webpack thing
                await fetchedContainer.init(__webpack_share_scopes__[scope]);
            }
            const container = window[remoteName as never]; // Assuming the remote has been loaded using the above function
            // @ts-expect-error -- uses internal functionality
            const factory = await container.get(moduleName);
            return factory();
        } catch (error) {
            const e = error as Error;
            e.name = `Failed to fetch remote - ${remoteHost}${remoteName}${moduleName}`;
            // We don't want to log here because error boundary already logs.
            // throw e;
            return { default: () => fallback };
        }
    };
