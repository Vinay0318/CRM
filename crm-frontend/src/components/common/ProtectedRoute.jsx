import React from "react";

import {
    Navigate,
    useLocation
} from "react-router-dom";

function ProtectedRoute({

    children,

    role

}) {

    const location = useLocation();

    const token =
        localStorage.getItem("token");

    const userRole =
        localStorage.getItem("role");

    // User not logged in
    if (!token) {

        return (

            <Navigate

                to="/"

                replace

                state={{
                    from: location
                }}

            />

        );

    }

    // Unauthorized Role
    if (

        role &&

        role !== userRole

    ) {

        return (

            <Navigate

                to="/"

                replace

            />

        );

    }

    return children;

}

export default React.memo(ProtectedRoute);