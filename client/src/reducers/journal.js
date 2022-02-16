import { TOGGLE_MODAL } from '../actions/types';

const initialState = {
  modal: false,
};

export default function journal(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case TOGGLE_MODAL:
      return {
        ...state,
        modal: !state.modal,
      };
    default:
      return state;
  }
}
