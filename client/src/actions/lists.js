import { CREATED_LIST, GOT_LISTS, DELETED_LIST, UPDATED_LIST } from '../actions/types';

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

export const deleteList = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`api/lists/${id}`);
    dispatch({ type: DELETED_LIST, payload: res.data });
  } catch (err) {
    console.log(err);
  }
};

export const updateList = (list) => async (dispatch) => {
  try {
    const res = await axios.put(`api/lists/${list._id}`, list);
    dispatch({ type: UPDATED_LIST, payload: res.data });
  } catch (err) {
    console.log(err);
  }
};
