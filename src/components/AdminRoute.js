import React from "react";

import { Route, Redirect } from "react-router-dom";

import { useAuth } from "./AuthProvider";
import AdminDataProvider from "./AdminDataProvider";

export default function AdminRoute({ component: Component, ...restProps }) {
    const { user, isAdmin } = useAuth();

    if (!isAdmin) {
        return <Redirect to="/employer" />
    }

    return (
        <Route
            {...restProps}
            render={props => {
                return user && isAdmin ? (
                    <AdminDataProvider>
                        <Component {...props} />
                    </AdminDataProvider>
                ) : (
                        <Redirect
                            to={{
                                pathname: "/login",
                                state: {
                                    from: props.location
                                }
                            }}
                        />
                    );
            }}
        />
    );
}
