import * as actionTypes from "../types/checkInType";

const initialState = {
  checkIns: {},
  createCheckInFail: "",
  createCheckInLoading: false,
};

const contactReducer = (state = initialState, action: any): any => {
  switch (action.type) {
    case actionTypes.CREATE_CHECK_IN_REQUEST:
      return {
        ...state,
        createCheckInLoading: true,
        createCheckInFail: "",
      };
    case actionTypes.CREATE_CHECK_IN_SUCCESS:
      return {
        ...state,
        checkIns: {
          ...state.checkIns,
          [action.payload.id]: action.payload
        },
        createCheckInLoading: false,
        createCheckInFail: "",
      };
    case actionTypes.CREATE_CHECK_IN_FAIL:
      return {
        ...state,
        createCheckInFail: action.payload,
        createCheckInLoading: false,
      };
    default:
      return state;
  }
};

export default contactReducer;
