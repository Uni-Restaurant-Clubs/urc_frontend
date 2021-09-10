import { combineReducers } from 'redux';
import authReducer from './authReducer';
import reviewReducer from './reviewReducer';
import contactReducer from './contactReducer';
import contentCreatorReducer from './contentCreatorReducer';

export default combineReducers({
  auth: authReducer,
  contact: contactReducer,
  contentCreators: contentCreatorReducer,
  reviews: reviewReducer
});
