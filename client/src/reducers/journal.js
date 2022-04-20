import {
  CREATE_JOURNAL,
  GOT_ONE_JOURNAL,
  CLEAR_JOURNALS,
  GOT_MONTHS_JOURNALS,
  UPDATE_JOURNAL,
  CLEAR_JOURNAL,
} from '../actions/types';

const initialState = {
  journal: {},
  journals: [],
};

export default function journal(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CLEAR_JOURNAL:
      return {
        ...state,
        journal: [],
      };
    case UPDATE_JOURNAL:
      return {
        ...state,
        journal: payload,
      };
    case GOT_MONTHS_JOURNALS:
      return {
        ...state,
        journals: payload,
      };
    case CLEAR_JOURNALS:
      return {
        ...state,
        journals: [],
      };
    case GOT_ONE_JOURNAL:
      return {
        ...state,
        journal: payload,
      };
    case CREATE_JOURNAL:
      return {
        ...state,
        journal: payload.item,
      };

    default:
      return state;
  }
}
