import axios from "axios";
import * as actionTypes from "../types/reviewType";
import {
  getReviewUrl,
  getReviewsUrl,
} from "../../config/reviewConfig";
import { Storage } from "@capacitor/storage";

const getReview = (data: any) => async (dispatch: any) => {
  try {
    dispatch({ type: actionTypes.GET_REVIEW_REQUEST, payload: true });
    let res = await axios.get(getReviewUrl + data.id);
    dispatch({ type: actionTypes.GET_REVIEW_SUCCESS, payload: res.data });
    return res;
  } catch (error) {
    dispatch({
      type: actionTypes.GET_REVIEW_FAIL,
      payload: error?.response?.data || {
        message: "Oops looks like something went wrong. Please try again soon",
      },
    });
  }
};

const getReviews = () => async (dispatch: any) => {
  try {
    dispatch({ type: actionTypes.GET_REVIEWS_REQUEST, payload: true });
    let res = await axios.get(getReviewsUrl);
    dispatch({ type: actionTypes.GET_REVIEWS_SUCCESS, payload: res.data });
    return res;
  } catch (error) {
    dispatch({
      type: actionTypes.GET_REVIEWS_FAIL,
      payload: error?.response?.data || {
        message: "Oops looks like something went wrong. Please try again soon",
      },
    });
  }
};

export const reviewActions = {
  getReview,
  getReviews,
};
