import * as actionTypes from "../types/reviewType";

const initialState = {
  reviews: {},
  getReviewFail: "",
};

const reducer = (state = initialState, action: any): any => {
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
        signupData: action.payload,
        getReviewLoading: false,
        getReviewFail: "",
      };
    case actionTypes.GET_REVIEW_FAIL:
      return {
        ...state,
        signUpFail: action.payload,
        signupLoading: false,
        signInFail: "",
      };
  }
};

export default reducer;
