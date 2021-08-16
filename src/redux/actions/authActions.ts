import axios from "axios";
import * as actionTypes from "../types/authType";
import {
  userLoginUrl,
  googleConnectUrl,
  userRegistrationUrl,
  forgotPasswordUrl,
  updatePasswordUrl,
  emailConfirmationUrl,
} from "../../config/authConfig";
import { Storage } from "@capacitor/storage";

const setUserState = (payload: any) => {
  return {
    type: actionTypes.ADD_ARTICLE,
    payload,
  };
};

const connectGoogle = (data: any) => async (dispatch: any) => {
  try {
    dispatch({ type: actionTypes.CONNECT_GOOGLE_REQUEST, payload: true });
    let res = await axios.post(googleConnectUrl, data);
    dispatch({ type: actionTypes.CONNECT_GOOGLE_SUCCESS, payload: res.data });
    await Storage.set({
      key: "accessToken",
      value: res.data.session_token,
    });
    return res.data.session_token;
  } catch (error) {
    dispatch({
      type: actionTypes.CONNECT_GOOGLE_FAIL,
      payload: error?.response?.data || {
        message: "Oops looks like something went wrong. Please try again soon",
      },
    });
  }
};

const registerUser = (data: any) => async (dispatch: any) => {
  try {
    dispatch({ type: actionTypes.REGISTER_USER_REQUEST, payload: true });
    let res = await axios.post(userRegistrationUrl, data);
    dispatch({ type: actionTypes.REGISTER_USER_SUCCESS, payload: res.data });
    return res;
  } catch (error) {
    dispatch({
      type: actionTypes.REGISTER_USER_FAIL,
      payload: error?.response?.data || {
        message: "Oops looks like something went wrong. Please try again soon",
      },
    });
  }
};

const logoutUser = () => async (dispatch: any) => {
  let res;
  try {
    dispatch({ type: actionTypes.LOGOUT_USER_REQUEST });

    await Storage.remove({key: "accessToken"});
    return true;
  } catch (error) {
  }
};

const loginUser = (data: any) => async (dispatch: any) => {
  let res;
  try {
    dispatch({ type: actionTypes.REGISTER_USER_REQUEST, payload: true });
    res = await axios.post(userLoginUrl, data);

    dispatch({ type: actionTypes.LOGIN_USER_SUCCESS, payload: res.data });
    await Storage.set({
      key: "accessToken",
      value: res.data.session_token,
    });
    return res.data.session_token;
  } catch (error) {
    dispatch({
      type: actionTypes.LOGIN_USER_FAIL,
      payload: error?.response?.data?.message || {
        message: "Oops looks like something went wrong. Please try again soon",
      },
    });
  }
};

const forgotPassword = (data: any) => async (dispatch: any) => {
  try {
    dispatch({ type: actionTypes.REGISTER_USER_REQUEST, payload: true });
    let res = await axios.post(forgotPasswordUrl, data);

    dispatch({ type: actionTypes.FORGOT_PASSWORD_SUCCESS, payload: res.data });

    return res;
  } catch (error) {
    dispatch({
      type: actionTypes.FORGOT_PASSWORD_FAIL,
      payload: error?.response?.data || {
        message: "Oops looks like something went wrong. Please try again soon",
      },
    });
    return (
      error?.response?.data || {
        message: "Oops looks like something went wrong. Please try again soon",
      }
    );
  }
};

const updatePassword = (data: any) => async (dispatch: any) => {
  try {
    dispatch({ type: actionTypes.REGISTER_USER_REQUEST, payload: true });
    let res = await axios.post(updatePasswordUrl, data);

    dispatch({ type: actionTypes.UPDATE_PASSWORD_SUCCESS, payload: res.data });

    return res;
  } catch (error) {
    dispatch({
      type: actionTypes.UPDATE_PASSWORD_FAIL,
      payload: error?.response?.data || {
        message: "Oops looks like something went wrong. Please try again soon",
      },
    });
  }
};

const emailConfirmation = (data: any) => async (dispatch: any) => {
  try {
    let res = await axios.post(emailConfirmationUrl, data);
    return res;
  } catch (error) {
    return (
      error?.response?.data || {
        message: "Oops looks like something went wrong. Please try again soon",
      }
    );
  }
};

export const authActions = {
  connectGoogle,
  setUserState,
  registerUser,
  loginUser,
  logoutUser,
  forgotPassword,
  updatePassword,
  emailConfirmation,
};
