import { TOGGLE_MODAL } from './types';

import axios from 'axios';

export const toggleModal = () => (dispatch) => {
  dispatch({
    type: TOGGLE_MODAL,
  });
  console.log('hit');
};
