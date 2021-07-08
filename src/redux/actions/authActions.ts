import axios from "axios";
import * as actionTypes from "../types/authType";
import {
  userLoginUrl,
  userRegistrationUrl,
  forgotPasswordUrl,
  updatePasswordUrl,
  emailConfirmationUrl,
} from "../../config/authConfig";

const setUserState = (payload: any) => {
  return {
    type: actionTypes.ADD_ARTICLE,
    payload,
  };
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
      payload: error.response.data,
    });
  }
};

const loginUser = (data: any) => async (dispatch: any) => {
  let res;
  try {
    dispatch({ type: actionTypes.REGISTER_USER_REQUEST, payload: true });
    res = await axios.post(userLoginUrl, data);

    dispatch({ type: actionTypes.LOGIN_USER_SUCCESS, payload: res.data });

    localStorage.setItem("accessToken", res.data.session_token);

    return res.data.session_token;
  } catch (error) {
    dispatch({
      type: actionTypes.LOGIN_USER_FAIL,
      payload: error.response.data,
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
      payload: error.response.data,
    });
    return error.response.data;
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
      payload: error.response.data,
    });
  }
};

const emailConfirmation = (data: any) => async (dispatch: any) => {
  try {
    let res = await axios.post(emailConfirmationUrl, data);
    return res;
  } catch (error) {
    dispatch({
      type: actionTypes.FORGOT_PASSWORD_FAIL,
      payload: error.response.data,
    });
    return error.response.data;
  }
};

export const authActions = {
  setUserState,
  registerUser,
  loginUser,
  forgotPassword,
  updatePassword,
  emailConfirmation,
};
