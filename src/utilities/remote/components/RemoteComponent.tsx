import React from "react";
import { loadComponent } from "../utilities";

export type RemoteProps = {
    // This hostedProps object can be used to pass ANY overriding value
    // to an application upon remote load.
    // this can include variables, functions, action dispatches,
    // even entire components. It's up to the remote to implement
    // these values however it sees fit.
    hostedProps?: Record<string, unknown>;
    remoteHost: string;
    remoteName: string;
    onLoading?: string | React.ReactElement;
    fallback?: React.ReactElement;
    scope?: string;
    component: string;
    children?: React.ReactNode;
    onRemoteUpdated?: (props: unknown) => void;
};
/**
 * Example of implementation
 * 
    render() {
        return(
            <RemoteComponent
                fallback="Loading router..."
                remote="subscription_admin"
                component="Routes"
            />
        )
    }        
*/
export class RemoteComponent extends React.PureComponent<RemoteProps> {
    public render() {
        const comp = loadComponent(
            this.props.remoteHost,
            this.props.remoteName,
            `./${this.props.component}`,
            this.props.fallback ?? <></>,
            this.props.scope,
        );
        const Component = React.lazy(comp);
        return (
            <React.Suspense fallback={this.props.onLoading ?? ""} data-testid="remote-component">
                <Component {...this.props} />
            </React.Suspense>
        );
    }
}
