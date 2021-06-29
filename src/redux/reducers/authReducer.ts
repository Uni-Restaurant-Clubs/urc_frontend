import * as actionTypes from "../types/authType";

const initialState = {
  signupData: "",
  signUpFail: "",
  signupLoading: false,
  forgotPasswordData: "",
  updatePasswordData: "",
  signinData: "",
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

    case actionTypes.LOGIN_USER_SUCCESS:
      return {
        ...state,
        signinData: action.payload,
        signupLoading: false,
      };
    case actionTypes.LOGIN_USER_FAIL:
      return {
        ...state,
        signUpFail: action.payload,
        signupLoading: false,
      };

    case actionTypes.FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        forgotPasswordData: action.payload,
        signupLoading: false,
      };
    case actionTypes.FORGOT_PASSWORD_FAIL:
      return {
        ...state,
        signUpFail: action.payload,
        signupLoading: false,
      };

    case actionTypes.UPDATE_PASSWORD_SUCCESS:
      return {
        ...state,
        updatePasswordData: action.payload,
        signupLoading: false,
      };
    case actionTypes.UPDATE_PASSWORD_FAIL:
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
