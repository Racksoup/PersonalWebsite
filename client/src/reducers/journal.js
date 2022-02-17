import { TOGGLE_MODAL, CREATE_JOURNAL, GOT_ONE_JOURNAL } from '../actions/types';

const initialState = {
  modal: false,
  journal: {},
  journals: [],
};

export default function journal(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GOT_ONE_JOURNAL:
      return {
        ...state,
        journal: payload.item,
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
