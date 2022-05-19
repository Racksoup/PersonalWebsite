import { CREATED_LIST, GOT_LISTS, DELETED_LIST, UPDATED_LIST } from '../actions/types';

const initialState = {
  lists: [],
};

export default function lists(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CREATED_LIST:
      return {
        ...state,
        lists: [...state.lists, payload.item],
      };
    case GOT_LISTS:
      return {
        ...state,
        lists: payload,
      };
    case DELETED_LIST:
      return {
        ...state,
        lists: state.lists.filter((list) => list.title !== payload.title),
      };
    case UPDATED_LIST:
      return {
        ...state,
        lists: state.lists.map((list) => {
          if (list._id !== payload._id) {
            return list;
          } else {
            return payload;
          }
        }),
      };
    default:
      return state;
  }
}
