import axios from "axios";
import * as actionTypes from "../types/authType";
import {
  userLoginUrl,
  oauthConnectUrl,
  userRegistrationUrl,
  forgotPasswordUrl,
  updatePasswordUrl,
  emailConfirmationUrl,
} from "../../config/authConfig";
import { Storage } from "@capacitor/storage";
import { Plugins } from '@capacitor/core';
import "@codetrix-studio/capacitor-google-auth";
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';


const setUserState = (payload: any) => {
  return {
    type: actionTypes.ADD_ARTICLE,
    payload,
  };
};

const initiateOauth = (provider: string) => async (dispatch: any) => {
  try {
    dispatch({ type: actionTypes.OAUTH_INITIAL_REQUEST, payload: true });
    let result;
    if (provider === "google") {
      result = await GoogleAuth.signIn();
      console.log("result", result);
    }
    if (result && result.serverAuthCode) {
      dispatch({ type: actionTypes.OAUTH_INITIAL_SUCCESS });
      return result.serverAuthCode;
    } else {
      dispatch({
        type: actionTypes.OAUTH_INITIAL_FAIL,
        payload: result || {
          message: "Oops looks like something went wrong. Please try again soon",
        },
      });
      return null;
    }
  } catch (error) {
    console.log("error", error);
    let fullError = null;
    if (error?.error === "popup_closed_by_user") {
     error = "Looks like you closed the popup window. Please click connect again to start over.";
    } else {
      error = null;
    }

    if (error) {
      fullError = { message: error }
    } else {
      fullError = null;
    }
    dispatch({
      type: actionTypes.OAUTH_INITIAL_FAIL,
      payload: fullError || {
        message: "Oops looks like something went wrong. Please try again soon",
      },
    });
  }
};

const connectOauth = (data: any) => async (dispatch: any) => {
  try {
    dispatch({ type: actionTypes.OAUTH_CONNECT_REQUEST, payload: true });
    const oauthUrl = oauthConnectUrl + data.provider
    let res = await axios.post(oauthUrl, data);
    dispatch({ type: actionTypes.OAUTH_CONNECT_SUCCESS, payload: res.data });
    await Storage.set({
      key: "accessToken",
      value: res.data.session_token,
    });
    return res.data.session_token;
  } catch (error) {
    dispatch({
      type: actionTypes.OAUTH_CONNECT_FAIL,
      payload: {
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
  initiateOauth,
  connectOauth,
  setUserState,
  registerUser,
  loginUser,
  logoutUser,
  forgotPassword,
  updatePassword,
  emailConfirmation,
};
