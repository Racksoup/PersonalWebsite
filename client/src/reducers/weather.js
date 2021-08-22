import {
  GOT_FORECAST,
  FORECAST_ERROR,
  GOT_ONE_CALL_WEATHER,
  WEATHER_ERROR,
  HISTORICAL_ERROR,
  GOT_HISTORICAL,
  GOT_SAVED_WEATHER,
  SAVED_WEATHER_ERROR,
  WEATHER_POSTED,
} from '../actions/types';

const initialState = {
  forecast: null,
  current: null,
  minutely: null,
  hourly: null,
  daily: null,
  historical: null,
  savedWeather: null,
  weatherPosted: false,
  gotHistorical: false,
  gotSavedWeather: false,
};

export default function forecast(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case WEATHER_POSTED:
      return {
        ...state,
        weatherPosted: true,
      };
    case GOT_SAVED_WEATHER:
      return {
        ...state,
        savedWeather: payload,
        gotSavedWeather: true,
      };
    case GOT_HISTORICAL:
      return {
        ...state,
        historical: payload,
        gotHistorical: true,
      };
    case GOT_ONE_CALL_WEATHER:
      return {
        ...state,
        current: payload.current,
        minutely: payload.minutely,
        hourly: payload.hourly,
        daily: payload.daily,
      };
    case GOT_FORECAST:
      return {
        ...state,
        forecast: payload,
      };
    case SAVED_WEATHER_ERROR:
      return {
        ...state,
        savedWeather: null,
      };
    case HISTORICAL_ERROR:
      return {
        ...state,
        historical: null,
      };
    case WEATHER_ERROR:
      return {
        ...state,
        current: null,
        minutely: null,
        hourly: null,
        daily: null,
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
