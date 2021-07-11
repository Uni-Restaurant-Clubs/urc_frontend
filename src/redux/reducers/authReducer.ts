import * as actionTypes from "../types/authType";

const initialState = {
  signupData: "",
  signUpFail: "",
  signupLoading: false,
  signinData: "",
  signInFail: "",
  forgotPasswordData: "",
  updatePasswordData: "",
  updatePasswordFail: "",
  forgotPasswordFail: "",
};

const reducer = (state = initialState, action: any): any => {
  switch (action.type) {
    case actionTypes.REGISTER_USER_REQUEST:
      return {
        ...state,
        signupLoading: action.payload,
        signUpFail: "",
        signInFail: "",
        forgotPasswordFail: "",
        updatePasswordFail: "",
      };
    case actionTypes.REGISTER_USER_SUCCESS:
      return {
        ...state,
        signupData: action.payload,
        signupLoading: false,
        signUpFail: "",
      };
    case actionTypes.REGISTER_USER_FAIL:
      return {
        ...state,
        signUpFail: action.payload,
        signupLoading: false,
        signInFail: "",
      };

    case actionTypes.LOGIN_USER_SUCCESS:
      return {
        ...state,
        signinData: action.payload,
        signupLoading: false,
        signInFail: "",
      };
    case actionTypes.LOGIN_USER_FAIL:
      return {
        ...state,
        signInFail: action.payload,
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
        forgotPasswordFail: action.payload,
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
        updatePasswordFail: action.payload,
        signupLoading: false,
      };
    default:
      return state;
  }
};

export default reducer;
