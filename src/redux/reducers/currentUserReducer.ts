import * as actionTypes from "../types/currentUserType";

const initialState = {
  currentUser: null,
  getCurrentUserFail: "",
  getCurrentUserLoading: false,
};

const currentUserReducer = (state = initialState, action: any): any => {
  switch (action.type) {
    case actionTypes.GET_CURRENT_USER_REQUEST:
      return {
        ...state,
        getCurrentUserLoading: true,
        getCurrentUserFail: "",
      };
    case actionTypes.GET_CURRENT_USER_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
        getCurrentUserLoading: false,
        getCurrentUserFail: "",
      };
    case actionTypes.GET_CURRENT_USER_FAIL:
      return {
        ...state,
        getCurrentUserFail: action.payload,
        getCurrentUserLoading: false,
      };
    default:
      return state;
  }
};

export default currentUserReducer;
