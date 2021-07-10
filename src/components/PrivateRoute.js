import React, { useEffect, useState } from "react";
import { Route, Redirect } from "react-router-dom";
import { Storage } from "@capacitor/storage";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const [isAuthenticated, setIsAuthenticated] = useState("");

  useEffect(() => {
    const getAuth = async () => {
      let { value } = await Storage.get({
        key: "accessToken",
      });
      setIsAuthenticated(value);
    };
    getAuth();
  }, []);

  if (isAuthenticated !== "") {
    return (
      <Route
        {...rest}
        render={(props) =>
          isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
        }
      />
    );
  } else {
    return null;
  }
};

export default PrivateRoute;
