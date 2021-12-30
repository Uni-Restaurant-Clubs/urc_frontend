import * as actionTypes from "../types/dealType";

const initialState = {
  deals: {},
  getDealFail: "",
  getDealLoading: false,
};

const dealReducer = (state = initialState, action: any): any => {
  switch (action.type) {
    case actionTypes.GET_DEAL_REQUEST:
      return {
        ...state,
        getDealLoading: true,
        getDealFail: "",
      };
    case actionTypes.GET_DEAL_SUCCESS:
      return {
        ...state,
        deals: {
          ...state.deals,
          [action.payload.id]: action.payload
        },
        getDealLoading: false,
        getDealFail: "",
      };
    case actionTypes.GET_DEAL_FAIL:
      return {
        ...state,
        getDealFail: action.payload,
        getDealLoading: false,
      };
    default:
      return state;
  }
};

export default dealReducer;
