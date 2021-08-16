import { combineReducers } from 'redux';
import authReducer from './authReducer';
import reviewReducer from './reviewReducer';
export default combineReducers({
  auth: authReducer,
  reviews: reviewReducer
});
