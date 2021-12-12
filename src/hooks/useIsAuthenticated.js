import React, { useState, useEffect } from 'react';
import { Storage } from "@capacitor/storage";

const useIsAuthenticated = () => {

  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const getAuth = async () => {
      let { value } = await Storage.get({
        key: "accessToken",
      });
      setIsAuthenticated(value);
    };
    getAuth();
  }, []);

  return isAuthenticated ? true : false;
}

export default useIsAuthenticated;
