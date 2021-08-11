import { combineReducers } from 'redux';
import auth from './auth';
import forecast from './forecast';

export default combineReducers({
  auth,
  forecast,
});
