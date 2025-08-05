import React from "react";
import { Navigate  } from "react-router-dom";

const PrivateRoute = ({ children }) => {
    const auth = JSON.parse(localStorage.getItem("auth"));

    if (! auth || !auth.isLoggedIn) {
        return <Navigate to="/login" replace />
    }

    return children;
};

export default PrivateRoute;