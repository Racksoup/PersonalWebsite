import {
  GOT_FORECAST,
  FORECAST_ERROR,
  GOT_ONE_CALL_WEATHER,
  WEATHER_ERROR,
} from '../actions/types';

const initialState = {
  forecast: null,
  current: null,
  minutely: null,
  hourly: null,
  daily: null,
};

export default function forecast(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GOT_ONE_CALL_WEATHER:
      return {
        ...state,
        current: payload.current,
        minutely: payload.minutely,
        hourly: payload.hourly,
        daily: payload.daily,
      };
    case WEATHER_ERROR:
      return {
        ...state,
        current: null,
        minutely: null,
        hourly: null,
        daily: null,
      };
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
