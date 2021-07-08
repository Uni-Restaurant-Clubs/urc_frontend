import React from "react";
import { Route, Redirect } from "react-router-dom";

const AuthRoute = ({ component: Component, ...rest }) => {
  let isAuthenticated = localStorage.getItem("accessToken");

  return (
    // Show the component only when the user is logged in
    // Otherwise, redirect the user to /signin page
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? <Redirect to="/main" /> : <Component {...props} />
      }
    />
  );
};

export default AuthRoute;
