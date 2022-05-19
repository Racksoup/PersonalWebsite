import {
  CREATED_LISTITEM,
  GOT_LIST,
  DELETED_LISTITEM,
  UPDATED_LISTITEM,
  DELETED_LIST,
} from '../actions/types';

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
      return {
        ...state,
        list: state.list.filter((item) => {
          if (item._id !== payload._id) {
            return item;
          } else {
            return item;
          }
        }),
      };
    case DELETED_LIST:
      return {
        ...state,
        list: [],
      };
    default:
      return state;
  }
}
