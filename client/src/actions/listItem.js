import { CREATED_LISTITEM, GOT_LIST, DELETED_LISTITEM, UPDATED_LISTITEM } from '../actions/types';

import axios from 'axios';

export const getList = (title) => async (dispatch) => {
  try {
    const res = await axios.get(`api/listItem/${title}`);
    dispatch({ type: GOT_LIST, payload: res.data });
  } catch (err) {
    console.log(err);
  }
};

export const createListItem = (item) => async (dispatch) => {
  try {
    const res = await axios.post('api/listItem', item);
    dispatch({ type: CREATED_LISTITEM, payload: res.data });
  } catch (err) {
    console.log(err);
  }
};

export const updateListItem = (item) => async (dispatch) => {
  try {
    const res = await axios.put(`api/listItem/${item._id}`, item);
    dispatch({ type: UPDATED_LISTITEM, payload: res.data });
  } catch (err) {
    console.log(err);
  }
};

export const deleteListItem = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`api/listItem/${id}`);
    dispatch({ type: DELETED_LISTITEM, payload: res.data });
  } catch (err) {
    console.log(err);
  }
};
