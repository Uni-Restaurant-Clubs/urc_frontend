import * as actionTypes from "../types/authType";

const initialState = {
  signupData: "",
  signUpFail: "",
  signupLoading: false,
};

const reducer = (state = initialState, action: any): any => {
  switch (action.type) {
    case actionTypes.REGISTER_USER_REQUEST:
      return {
        ...state,
        signupLoading: action.payload,
      };
    case actionTypes.REGISTER_USER_SUCCESS:
      return {
        ...state,
        signupData: action.payload,
        signupLoading: false,
      };
    case actionTypes.REGISTER_USER_FAIL:
      return {
        ...state,
        signUpFail: action.payload,
        signupLoading: false,
      };
    default:
      return state;
  }
};

export default reducer;
