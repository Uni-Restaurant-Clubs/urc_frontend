import axios from "axios";
import * as actionTypes from "../types/dealType";
import {
  getDealUrl,
} from "../../config/dealConfig";

const getDeal = (data: any) => async (dispatch: any) => {
  try {
    dispatch({ type: actionTypes.GET_DEAL_REQUEST });
    let res = await axios.get(getDealUrl + data.id);
    dispatch({ type: actionTypes.GET_DEAL_SUCCESS, payload: res.data });
    return res;
  } catch (error) {
    dispatch({
      type: actionTypes.GET_DEAL_FAIL,
      payload: error?.response?.data || {
        message: "Oops looks like something went wrong. Please try again soon",
      },
    });
  }
};

export const dealActions = {
  getDeal,
};
