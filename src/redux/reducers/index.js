import { combineReducers } from 'redux';
import authReducer from './authReducer';
import reviewReducer from './reviewReducer';

export default combineReducers({
  authReducer,
  reviewReducer
});
