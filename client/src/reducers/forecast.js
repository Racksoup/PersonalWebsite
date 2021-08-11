import { GOT_FORECAST, FORECAST_ERROR } from '../actions/types';

const initialState = {
  forecast: null,
};

export default function forecast(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GOT_FORECAST:
      return {
        ...state,
        forecast: payload,
      };
    case FORECAST_ERROR:
      return {
        ...state,
        forecast: null,
      };
    default:
      return state;
  }
}
