import * as actionTypes from "../types/promotionType";

const initialState = {
  isInterestedFail: "",
  isInterestedLoading: false,
  notInterestedFail: "",
  notInterestedLoading: false,
  infoForForm: {},
  infoForFormLoading: false,
  infoForFormFail: "",

};

const promotionReducer = (state = initialState, action: any): any => {
  switch (action.type) {
    case actionTypes.GET_INFO_FOR_FORM_REQUEST:
      return {
        ...state,
        infoForFormLoading: true,
        infoForFormFail: "",
      };
    case actionTypes.GET_INFO_FOR_FORM_SUCCESS:
      return {
        ...state,
        infoForForm: action.payload,
        infoForFormLoading: false,
        infoForFormFail: "",
      };
    case actionTypes.GET_INFO_FOR_FORM_FAIL:
      return {
        ...state,
        infoForFormFail: action.payload,
        infoForFormLoading: false,
      };
    case actionTypes.SEND_NOT_INTERESTED_REQUEST:
      return {
        ...state,
        notInterestedLoading: true,
        notInterestedFail: "",
      };
    case actionTypes.SEND_NOT_INTERESTED_SUCCESS:
      return {
        ...state,
        notInterestedLoading: false,
        notInterestedFail: "",
      };
    case actionTypes.SEND_NOT_INTERESTED_FAIL:
      return {
        ...state,
        notInterestedFail: true,
        notInterestedLoading: false,
      };
    case actionTypes.SEND_NOT_INTERESTED_REQUEST:
      return {
        ...state,
        isInterestedLoading: true,
        isInterestedFail: "",
      };
    case actionTypes.SEND_IS_INTERESTED_SUCCESS:
      return {
        ...state,
        isInterestedLoading: false,
        isInterestedFail: "",
      };
    case actionTypes.SEND_IS_INTERESTED_FAIL:
      return {
        ...state,
        isInterestedFail: true,
        isInterestedLoading: false,
      };
    default:
      return state;
  }
};

export default promotionReducer;
