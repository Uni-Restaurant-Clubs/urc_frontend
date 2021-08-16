import * as actionTypes from "../types/reviewType";

const initialState = {
  reviews: {},
  getReviewFail: "",
  getReviewLoading: false,
  getReviewsFail: "",
  getReviewsLoading: false,
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
