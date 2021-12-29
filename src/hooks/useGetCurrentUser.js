import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Storage } from "@capacitor/storage";
import { currentUserActions } from "../redux/actions/currentUserActions";

const useGetCurrentUser = (isAuthenticated) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getCurrentUser = async () => {
      let res = await dispatch(currentUserActions.getCurrentUser());
    };
    if (isAuthenticated) {
      getCurrentUser();
    }
  }, [isAuthenticated]);

}

export default useGetCurrentUser;
