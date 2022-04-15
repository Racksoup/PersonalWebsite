import { CREATED_LIST, GOT_LISTS, DELETED_LIST } from '../actions/types';

import axios from 'axios';

export const getLists = () => async (dispatch) => {
  try {
    const res = await axios.get('api/lists');
    dispatch({ type: GOT_LISTS, payload: res.data });
  } catch (err) {
    console.log(err);
  }
};

export const createList = (list) => async (dispatch) => {
  try {
    const res = await axios.post('api/lists', list);
    dispatch({ type: CREATED_LIST, payload: res.data });
  } catch (err) {
    console.log(err);
  }
};

export const deleteList = (list) => async (dispatch) => {
  try {
    axios.delete(`api/lists/${list._id}`);
    dispatch({ type: CREATED_LIST, payload: list });
  } catch (err) {
    console.log(err);
  }
};
