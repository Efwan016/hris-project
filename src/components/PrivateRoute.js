import React from "react";
import { Navigate  } from "react-router-dom";

const PrivateRoute = ({ children }) => {
    const auth = JSON.parse(localStorage.getItem("auth"));

     const isValidAuth =
        auth &&
        auth.isLoggedIn === true &&
        typeof auth.token === "string" &&
        auth.token.trim() !== "";

    if (!isValidAuth) {
        localStorage.removeItem("auth");
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default PrivateRoute;