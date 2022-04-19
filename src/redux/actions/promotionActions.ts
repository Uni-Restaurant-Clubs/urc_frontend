import axios from "axios";
import * as actionTypes from "../types/promotionType";
import {
  isInterestedUrl
} from "../../config/promotionConfig";
import { Storage } from "@capacitor/storage";

const sendIsInterested = (data: any) => async (dispatch: any) => {
  try {
    dispatch({ type: actionTypes.SEND_IS_INTERESTED_REQUEST });
    let res = await axios.post(isInterestedUrl,data);
    dispatch({ type: actionTypes.SEND_IS_INTERESTED_SUCCESS, payload: res.data });
    return res;
  } catch (error) {
    dispatch({
      type: actionTypes.SEND_IS_INTERESTED_FAIL,
      payload: error?.response?.data || {
        message: "Oops looks like something went wrong. Please try again soon",
      },
    });
  }
};

export const promotionActions = {
  sendIsInterested
};
