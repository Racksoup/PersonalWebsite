import { TOGGLE_MODAL, CREATE_JOURNAL, GOT_ONE_JOURNAL, CLEAR_JOURNALS } from '../actions/types';

const initialState = {
  modal: false,
  journal: {},
  journals: [],
};

export default function journal(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CLEAR_JOURNALS:
      return {
        ...state,
        journals: [],
      };
    case GOT_ONE_JOURNAL:
      return {
        ...state,
        journals: [...state.journals, payload],
      };
    case CREATE_JOURNAL:
      return {
        ...state,
        journals: [...state.journals, payload.item],
      };
    case TOGGLE_MODAL:
      return {
        ...state,
        modal: !state.modal,
      };
    default:
      return state;
  }
}
