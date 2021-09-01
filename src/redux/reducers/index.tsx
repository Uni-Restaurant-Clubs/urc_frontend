import { combineReducers } from 'redux';
import authReducer from './authReducer';
import reviewReducer from './reviewReducer';
import contentCreatorReducer from './contentCreatorReducer';

export default combineReducers({
  auth: authReducer,
  contentCreators: contentCreatorReducer,
  reviews: reviewReducer
});
