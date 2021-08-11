import { GOT_FORECAST, FORECAST_ERROR } from './types';

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
    dispatch({ type: FORECAST_ERROR });
  }
};
