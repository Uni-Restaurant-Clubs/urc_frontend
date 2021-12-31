import axios from "axios";
import * as actionTypes from "../types/checkInType";
import {
  createCheckInUrl,
} from "../../config/checkInConfig";
import { Storage } from "@capacitor/storage";

const createCheckIn = (data: any) => async (dispatch: any) => {
  try {
    dispatch({ type: actionTypes.CREATE_CHECK_IN_REQUEST });
    let res = await axios.post(createCheckInUrl,data);
    dispatch({ type: actionTypes.CREATE_CHECK_IN_SUCCESS, payload: res.data });
    return res;
  } catch (error) {
    dispatch({
      type: actionTypes.CREATE_CHECK_IN_FAIL,
      payload: error?.response?.data || {
        message: "Oops looks like something went wrong. Please try again soon",
      },
    });
  }
};

export const checkInActions = {
  createCheckIn,
};
