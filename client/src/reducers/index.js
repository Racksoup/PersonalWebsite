import { combineReducers } from 'redux';
import auth from './auth';
import weather from './weather';
import journal from './journal';
import lists from './lists';

export default combineReducers({
  auth,
  weather,
  journal,
  lists,
});
