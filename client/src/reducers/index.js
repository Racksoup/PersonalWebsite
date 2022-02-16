import { combineReducers } from 'redux';
import auth from './auth';
import weather from './weather';
import journal from './journal';

export default combineReducers({
  auth,
  weather,
  journal,
});
