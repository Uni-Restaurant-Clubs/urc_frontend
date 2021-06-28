import axios from "axios";
import * as actionTypes from "../types/authType";

const setUserState = (payload: any) => {
  return {
    type: actionTypes.ADD_ARTICLE,
    payload,
  };
};

const registerUser = (data: any) => async (dispatch: any) => {
  console.log(data);
  try {
    dispatch({ type: actionTypes.REGISTER_USER_REQUEST, payload: true });
    let res = await axios.post(
      "https://virtserver.swaggerhub.com/Uni-Restaurant-Clubs/uni-restaurant-clubs-api/1.0.0/users",
      data
    );
    dispatch({ type: actionTypes.REGISTER_USER_SUCCESS, payload: res.data });
    return res;
  } catch (error) {
    dispatch({ type: actionTypes.REGISTER_USER_FAIL, payload: error.message });
  }
};

const loginUser = (data: any) => async (dispatch: any) => {
  console.log(data);
  try {
    dispatch({ type: actionTypes.REGISTER_USER_REQUEST, payload: true });
    let res = await axios.post(
      "https://virtserver.swaggerhub.com/Uni-Restaurant-Clubs/uni-restaurant-clubs-api/1.0.0/sessions",
      data
    );
    dispatch({ type: actionTypes.REGISTER_USER_SUCCESS, payload: res.data });
    return res.data.session_token;
  } catch (error) {
    dispatch({ type: actionTypes.REGISTER_USER_FAIL, payload: error.message });
  }
};

export const authActions = {
  setUserState,
  registerUser,
  loginUser,
};
