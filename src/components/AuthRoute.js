import React, { useEffect, useState } from "react";
import { Route, Redirect } from "react-router-dom";
import { Storage } from "@capacitor/storage";

const AuthRoute = ({ component: Component, ...rest }) => {
  const [isAuthenticated, setIsAuthenticated] = useState("");
  useEffect(() => {
    const getAuth = async () => {
      setIsAuthenticated(
        await Storage.get({
          key: "accessToken",
        })
      );
    };
    getAuth();
  }, []);
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated && isAuthenticated.value ? (
          <Redirect to="/" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default AuthRoute;
