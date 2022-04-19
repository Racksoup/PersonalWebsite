import { combineReducers } from 'redux';
import auth from './auth';
import weather from './weather';
import journal from './journal';
import lists from './lists';
import listItem from './listItem';

export default combineReducers({
  auth,
  weather,
  journal,
  lists,
  listItem,
});
