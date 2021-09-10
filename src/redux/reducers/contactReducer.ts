import * as actionTypes from "../types/contactType";

const initialState = {
  fail: "",
  loading: false,
};

const contactReducer = (state = initialState, action: any): any => {
  switch (action.type) {
    case actionTypes.SEND_EMAIL_REQUEST:
      return {
        ...state,
        loading: true,
        fail: false,
      };
    case actionTypes.SEND_EMAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        fail: false,
      };
    case actionTypes.SEND_EMAIL_FAIL:
      return {
        ...state,
        loading: false,
        fail: action.payload,
      };
    default:
      return state;
  }
};

export default contactReducer;
