import { GOT_FORECAST, FORECAST_ERROR, GOT_ONE_CALL_WEATHER, WEATHER_ERROR } from './types';

import axios from 'axios';

export const getFourDay = () => async (dispatch) => {
  try {
    const res = await axios.get('api/weather/');
    dispatch({
      type: GOT_FORECAST,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
    dispatch({ type: WEATHER_ERROR });
  }
};

export const getOneCallWeather = () => async (dispatch) => {
  try {
    const res = await axios.get('api/weather/one-call');
    dispatch({
      type: GOT_ONE_CALL_WEATHER,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
    dispatch({ type: FORECAST_ERROR });
  }
};
