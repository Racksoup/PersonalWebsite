import { TOGGLE_MODAL, CREATE_JOURNAL, GOT_ONE_JOURNAL } from './types';

import axios from 'axios';

export const toggleModal = () => (dispatch) => {
  dispatch({
    type: TOGGLE_MODAL,
  });
  console.log('hit');
};

export const createJournalPost = (item, file) => async (dispatch) => {
  let data = new FormData();
  data.append('file', file);
  data.append('title', item.title);
  data.append('text', item.text);

  try {
    const config = {
      headers: {
        accept: 'application/json',
        'Accept-Language': 'en-US,en;q=0.8',
        'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
      },
    };
    const res = await axios.post('api/journal', data, config);
    console.log(res);
    dispatch({
      type: CREATE_JOURNAL,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const getOneJournal = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/journal/${id}`);
    dispatch({
      type: GOT_ONE_JOURNAL,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};
