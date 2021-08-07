import * as actionTypes from "../types/reviewType";

const initialState = {
  reviews: {},
  getReviewFail: "",
  getReviewLoading: false
};

const reviewReducer = (state = initialState, action: any): any => {
  switch (action.type) {
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
    default:
      return state;
  }
};

export default reviewReducer;
