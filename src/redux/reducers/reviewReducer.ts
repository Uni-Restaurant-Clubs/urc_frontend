import * as actionTypes from "../types/reviewType";

const initialState = {
  reviews: {},
  getReviewFail: "",
  getReviewLoading: false,
  getReviewsFail: "",
  getReviewsLoading: false,
  sendScheduleInfoLoading: false,
  sendScheduleInfoFail: false,
  infoForSchedulingForm: {},
  infoForSchedulingFormLoading: false,
  infoForSchedulingFormFail: "",
};

const reviewReducer = (state = initialState, action: any): any => {
  switch (action.type) {
    case actionTypes.GET_INFO_FOR_SCHEDULING_FORM_REQUEST:
      return {
        ...state,
        infoForSchedulingFormLoading: true,
        infoForSchedulingFormFail: "",
      };
    case actionTypes.GET_INFO_FOR_SCHEDULING_FORM_SUCCESS:
      return {
        ...state,
        infoForSchedulingForm: action.payload,
        infoForSchedulingFormLoading: false,
        infoForSchedulingFormFail: "",
      };
    case actionTypes.GET_INFO_FOR_SCHEDULING_FORM_FAIL:
      return {
        ...state,
        infoForSchedulingFormFail: action.payload,
        infoForSchedulingFormLoading: false,
      };
    case actionTypes.SUBMIT_SCHEDULING_INFO_REQUEST:
      return {
        ...state,
        sendScheduleInfoLoading: false,
        sendScheduleInfoFail: false,
      };
    case actionTypes.SUBMIT_SCHEDULING_INFO_SUCCESS:
      return {
        ...state,
        sendScheduleInfoLoading: false,
        sendScheduleInfoFail: false,
      };
    case actionTypes.SUBMIT_SCHEDULING_INFO_FAIL:
      return {
        ...state,
        sendScheduleInfoLoading: false,
        sendScheduleInfoFail: action.payload,
      };
    case actionTypes.GET_REVIEW_REQUEST:
      return {
        ...state,
        getReviewLoading: action.payload,
        getReviewFail: "",
      };
    case actionTypes.GET_REVIEW_SUCCESS:
      return {
        ...state,
        reviews: {
          ...state.reviews,
          [action.payload.id]: action.payload
        },
        getReviewLoading: false,
        getReviewFail: "",
      };
    case actionTypes.GET_REVIEW_FAIL:
      return {
        ...state,
        getReviewFail: action.payload,
        getReviewLoading: false,
      };
    case actionTypes.GET_REVIEWS_REQUEST:
      return {
        ...state,
        getReviewsLoading: action.payload,
        getReviewsFail: "",
      };
    case actionTypes.GET_REVIEWS_SUCCESS:
      interface LooseObject {
        [key: number]: any
      }

      interface Review {
        id: number,
      }

      var reviews: LooseObject = {};
      action.payload.forEach((review: Review) => {
        reviews[review.id] = review;
      })

      return {
        ...state,
        reviews: reviews,
        getReviewsLoading: false,
        getReviewsFail: "",
      };
    case actionTypes.GET_REVIEWS_FAIL:
      return {
        ...state,
        getReviewsFail: action.payload,
        getReviewsLoading: false,
      };

    default:
      return state;
  }
};

export default reviewReducer;
