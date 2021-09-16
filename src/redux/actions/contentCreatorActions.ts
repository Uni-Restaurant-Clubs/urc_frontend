import axios from "axios";
import * as actionTypes from "../types/contentCreatorType";
import {
  getContentCreatorUrl,
  getContentCreatorsUrl,
  submitApplicationUrl,
} from "../../config/contentCreatorConfig";
import { Storage } from "@capacitor/storage";

const submitApplication = (data: any) => async (dispatch: any) => {
  try {
    dispatch({ type: actionTypes.SUBMIT_APPLICATION_REQUEST, payload: true });
    let res = await axios.post(submitApplicationUrl, data);
    dispatch({ type: actionTypes.SUBMIT_APPLICATION_SUCCESS, payload: res.data });
    return res;
  } catch (error) {
    dispatch({
      type: actionTypes.SUBMIT_APPLICATION_FAIL,
      payload: error?.response?.data || {
        message: "Oops looks like something went wrong. Please try again soon",
      },
    });
  }
};

const getContentCreator = (data: any) => async (dispatch: any) => {
  try {
    dispatch({ type: actionTypes.GET_CONTENT_CREATOR_REQUEST, payload: true });
    const url = getContentCreatorUrl + data.public_unique_username;
    let res = await axios.get(url);
    dispatch({ type: actionTypes.GET_CONTENT_CREATOR_SUCCESS, payload: res.data });
    return res;
  } catch (error) {
    dispatch({
      type: actionTypes.GET_CONTENT_CREATOR_FAIL,
      payload: error?.response?.data || {
        message: "Oops looks like something went wrong. Please try again soon",
      },
    });
  }
};

const getContentCreators = () => async (dispatch: any) => {
  try {
    dispatch({ type: actionTypes.GET_CONTENT_CREATORS_REQUEST, payload: true });
    let res = await axios.get(getContentCreatorsUrl);
    dispatch({ type: actionTypes.GET_CONTENT_CREATORS_SUCCESS, payload: res.data });
    return res;
  } catch (error) {
    dispatch({
      type: actionTypes.GET_CONTENT_CREATORS_FAIL,
      payload: error?.response?.data || {
        message: "Oops looks like something went wrong. Please try again soon",
      },
    });
  }
};

export const contentCreatorActions = {
  submitApplication,
  getContentCreator,
  getContentCreators,
};
