import {
  GOT_FORECAST,
  FORECAST_ERROR,
  GOT_ONE_CALL_WEATHER,
  WEATHER_ERROR,
  HISTORICAL_ERROR,
  GOT_HISTORICAL,
  GOT_SAVED_WEATHER,
  SAVED_WEATHER_ERROR,
  POST_WEATHER_ERROR,
  WEATHER_POSTED,
} from './types';

import axios from 'axios';
import store from '../store';

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

export const getHistorical = () => async (dispatch) => {
  try {
    const res = await axios.get('api/weather/historical');
    dispatch({
      type: GOT_HISTORICAL,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
    dispatch({ type: HISTORICAL_ERROR });
  }
};

export const getSavedWeather = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/weather/saved-weather');
    dispatch({
      type: GOT_SAVED_WEATHER,
      payload: res.data,
    });
    dispatch(postSavedWeather());
  } catch (err) {
    console.log(err);
    dispatch({ type: SAVED_WEATHER_ERROR });
  }
};

export const postSavedWeather = () => async (dispatch, getState) => {
  const { historical, savedWeather, weatherPosted } = store.getState().weather;
  let newHistorical;
  if (historical && savedWeather && !weatherPosted) {
    dispatch({ type: WEATHER_POSTED });
    newHistorical = historical.map((day) => {
      let newDay = {};
      newDay.date = new Date(day.current.dt * 1000);
      newDay.dt = day.current.dt;
      newDay.data = day;
      return newDay;
    });
    for (let i = 0; i < savedWeather.length; i++) {
      newHistorical = newHistorical.filter((day) => day.dt !== savedWeather[i].dt);
    }
    try {
      newHistorical.map(async (day) => {
        await axios.post('/api/weather/saved-weather', day);
      });
    } catch (err) {
      console.log(err);
      dispatch({ type: POST_WEATHER_ERROR });
    }
  }
};
