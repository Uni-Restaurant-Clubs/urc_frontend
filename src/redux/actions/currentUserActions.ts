import axios from "axios";
import * as actionTypes from "../types/currentUserType";
import {
  getCurrentUserUrl,
} from "../../config/currentUserConfig";
import { Storage } from "@capacitor/storage";

const getCurrentUser = (data: any) => async (dispatch: any) => {
  try {
    dispatch({ type: actionTypes.GET_CURRENT_USER_REQUEST });
    const url = getCurrentUserUrl;
    let res = await axios.get(url);
    dispatch({ type: actionTypes.GET_CURRENT_USER_SUCCESS, payload: res.data });
    return res;
  } catch (error) {
    dispatch({
      type: actionTypes.GET_CURRENT_USER_FAIL,
      payload: error?.response?.data || {
        message: "Oops looks like something went wrong. Please try again soon",
      },
    });
  }
};
export const currentUserActions = {
  getCurrentUser
};
