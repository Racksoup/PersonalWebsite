import { CREATED_LISTITEM, GOT_LIST, DELETED_LISTITEM, UPDATED_LISTITEM } from '../actions/types';

const initialState = {
  list: [],
};

export default function lists(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CREATED_LISTITEM:
      return {
        ...state,
        list: [...state.list, payload],
      };
    case GOT_LIST:
      return {
        ...state,
        list: payload,
      };
    case DELETED_LISTITEM:
      return {
        ...state,
        list: state.list.filter((item) => item.title !== payload.title),
      };
    case UPDATED_LISTITEM:
      let newList = state.list;
      newList.filter((item) => item.title !== payload.title);
      newList.push(payload);
      return {
        ...state,
        list: newList,
      };
    default:
      return state;
  }
}
