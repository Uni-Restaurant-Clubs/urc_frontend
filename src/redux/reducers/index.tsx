import { combineReducers } from 'redux';
import authReducer from './authReducer';
import paymentReducer from './paymentReducer';
import reviewReducer from './reviewReducer';
import contactReducer from './contactReducer';
import contentCreatorReducer from './contentCreatorReducer';
import currentUserReducer from './currentUserReducer';

export default combineReducers({
  auth: authReducer,
  contact: contactReducer,
  contentCreators: contentCreatorReducer,
  reviews: reviewReducer,
  payments: paymentReducer,
  currentUser: currentUserReducer,
});
