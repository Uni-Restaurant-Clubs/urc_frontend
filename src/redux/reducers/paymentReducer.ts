import * as actionTypes from "../types/paymentType";

const initialState = {
  payments: {},
  getCheckoutUrlFail: "",
  getCheckoutUrlLoading: false,
};

const paymentReducer = (state = initialState, action: any): any => {
  switch (action.type) {
    case actionTypes.GET_CHECKOUT_URL_REQUEST:
      return {
        ...state,
        getCheckoutUrlLoading: action.payload,
        getCheckoutUrlFail: "",
      };
    case actionTypes.GET_CHECKOUT_URL_SUCCESS:
      return {
        ...state,
        getCheckoutUrlLoading: false,
        getCheckoutUrlFail: "",
      };
    case actionTypes.GET_CHECKOUT_URL_FAIL:
      return {
        ...state,
        getCheckoutUrlFail: action.payload,
        getCheckoutUrlLoading: false,
      };
    default:
      return state;
  }
};

export default paymentReducer;
