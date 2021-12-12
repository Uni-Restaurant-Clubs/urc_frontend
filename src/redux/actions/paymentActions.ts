import axios from "axios";
import * as actionTypes from "../types/paymentType";
import {
  getCheckoutUrlUrl,
} from "../../config/paymentConfig";
import { Storage } from "@capacitor/storage";

const getCheckoutUrl = (data: any) => async (dispatch: any) => {
  try {
    dispatch({ type: actionTypes.GET_CHECKOUT_URL_REQUEST, payload: true });
    const price_id = process.env.REACT_APP_STRIPE_PRICE_ID;
    const res = await axios.post(getCheckoutUrlUrl,
      { price_id, recaptcha_token: data.recaptchaToken });
    dispatch({ type: actionTypes.GET_CHECKOUT_URL_SUCCESS, payload: res.data });
    return res;
  } catch (error) {
    dispatch({
      type: actionTypes.GET_CHECKOUT_URL_FAIL,
      payload: error?.response?.data || {
        message: "Oops looks like something went wrong. Please try again soon",
      },
    });
  }
};

export const paymentActions = {
  getCheckoutUrl
};
