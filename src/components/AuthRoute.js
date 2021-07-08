import React from "react";
import { Route, Redirect } from "react-router-dom";

const AuthRoute = ({ component: Component, ...rest }) => {
  let isAuthenticated = localStorage.getItem("accessToken");

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? <Redirect to="/main" /> : <Component {...props} />
      }
    />
  );
};

export default AuthRoute;
