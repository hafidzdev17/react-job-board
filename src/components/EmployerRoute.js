import React from "react";

import { Route, Redirect } from "react-router-dom";

import { useAuth } from "./AuthProvider";
import EmployerDataProvider from "./EmployerDataProvider";

export default function EmployerRoute({ component: Component, ...restProps }) {
    const { user, isAdmin } = useAuth();

    if (isAdmin) {
        return <Redirect to="/admin" />
    }

    return (
        <Route
            {...restProps}
            render={props => {
                return user ? (
                    <EmployerDataProvider>
                        <Component {...props} />
                    </EmployerDataProvider>
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
