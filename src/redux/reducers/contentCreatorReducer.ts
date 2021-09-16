import * as actionTypes from "../types/contentCreatorType";

const initialState = {
  contentCreators: {},
  getContentCreatorFail: "",
  getContentCreatorLoading: false,
  getContentCreatorsFail: "",
  getContentCreatorsLoading: false,
  application: {
    loading: false,
    fail: false,
  }

};

const contentCreatorReducer = (state = initialState, action: any): any => {
  switch (action.type) {
    case actionTypes.SUBMIT_APPLICATION_REQUEST:
      return {
        ...state,
        application: {
          loading: true,
          fail: false,
        }
      };
    case actionTypes.SUBMIT_APPLICATION_SUCCESS:
      return {
        ...state,
        application: {
          loading: false,
          fail: false,
        }
      };
    case actionTypes.SUBMIT_APPLICATION_FAIL:
      return {
        ...state,
        application: {
          loading: false,
          fail: action.payload,
        }
      };
    case actionTypes.GET_CONTENT_CREATOR_REQUEST:
      return {
        ...state,
        getContentCreatorLoading: action.payload,
        getContentCreatorFail: "",
      };
    case actionTypes.GET_CONTENT_CREATOR_SUCCESS:
      return {
        ...state,
        contentCreators: {
          ...state.contentCreators,
          [action.payload.public_unique_username]: action.payload
        },
        getContentCreatorLoading: false,
        getContentCreatorFail: "",
      };
    case actionTypes.GET_CONTENT_CREATOR_FAIL:
      return {
        ...state,
        getContentCreatorFail: action.payload,
        getContentCreatorLoading: false,
      };
    case actionTypes.GET_CONTENT_CREATORS_REQUEST:
      return {
        ...state,
        getContentCreatorsLoading: action.payload,
        getContentCreatorsFail: "",
      };
    case actionTypes.GET_CONTENT_CREATORS_SUCCESS:
      interface LooseObject {
        [key: number]: any
      }

      interface ContentCreator {
        id: number,
      }

      var contentCreators: LooseObject = {};
      action.payload.forEach((contentCreator: ContentCreator) => {
        contentCreators[contentCreator.id] = contentCreator;
      })

      return {
        ...state,
        contentCreators: contentCreators,
        getContentCreatorsLoading: false,
        getContentCreatorsFail: "",
      };
    case actionTypes.GET_CONTENT_CREATORS_FAIL:
      return {
        ...state,
        getContentCreatorsFail: action.payload,
        getContentCreatorsLoading: false,
      };

    default:
      return state;
  }
};

export default contentCreatorReducer;
