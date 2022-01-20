import axios from "axios";
import * as actionTypes from "../types/reviewType";
import {
  getReviewUrl,
  getReviewsUrl,
  submitSchedulingInfoUrl,
  getInfoForSchedulingFormUrl
} from "../../config/reviewConfig";
import { Storage } from "@capacitor/storage";

const submitSchedulingInfo = (data: any) => async (dispatch: any) => {
  try {
    dispatch({ type: actionTypes.SUBMIT_SCHEDULING_INFO_REQUEST, payload: true });
    let formData = new FormData();
    Object.keys(data).forEach(key => formData.append(key, data[key]));
    const config = {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    }
    let res = await axios.post(submitSchedulingInfoUrl, formData, config);
    dispatch({ type: actionTypes.SUBMIT_SCHEDULING_INFO_SUCCESS, payload: res.data });
    return res;
  } catch (error) {
    dispatch({
      type: actionTypes.SUBMIT_SCHEDULING_INFO_FAIL,
      payload: error?.response?.data || {
        message: "Oops looks like something went wrong. Please try again soon",
      },
    });
  }
};

const getInfoForSchedulingForm = (data: any) => async (dispatch: any) => {
  try {
    dispatch({ type: actionTypes.GET_INFO_FOR_SCHEDULING_FORM_REQUEST });
    let res = await axios.get(getInfoForSchedulingFormUrl + data.token +
              "/info_for_scheduling_form");
    dispatch({ type: actionTypes.GET_INFO_FOR_SCHEDULING_FORM_SUCCESS, payload: res.data });
    return res;
  } catch (error) {
    dispatch({
      type: actionTypes.GET_INFO_FOR_SCHEDULING_FORM_FAIL,
      payload: error?.response?.data || {
        message: "Oops looks like something went wrong. Please try again soon",
      },
    });
  }
};

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
  submitSchedulingInfo,
  getInfoForSchedulingForm
};
