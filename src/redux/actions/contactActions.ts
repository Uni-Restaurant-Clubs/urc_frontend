import axios from "axios";
import * as actionTypes from "../types/contactType";
import {
  sendEmailUrl,
} from "../../config/contactConfig";
import { Storage } from "@capacitor/storage";

const sendEmail = (data: any) => async (dispatch: any) => {
  try {
    dispatch({ type: actionTypes.SEND_EMAIL_REQUEST, payload: true });
    const url = sendEmailUrl;
    let res = await axios.get(url);
    dispatch({ type: actionTypes.SEND_EMAIL_SUCCESS, payload: res.data });
    return res;
  } catch (error) {
    dispatch({
      type: actionTypes.SEND_EMAIL_FAIL,
      payload: error?.response?.data || {
        message: "Oops looks like something went wrong. Please try again soon",
      },
    });
  }
};

export const contactActions = {
  sendEmail,
};
