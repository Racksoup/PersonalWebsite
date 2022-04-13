import React from 'react';

import { Link } from 'react-router-dom';
import '../../css/weather.scss';

const Weather = () => {
  return (
    <div className='WeatherPage-Main'>
      <div className='Weather-TitleBox'>
        <Link className='Weather-Link' to='/home'>
          <div className='Weather-Btn Weather-BackBtn'>Back</div>
        </Link>
        <h1 className='Weather-Title'>Weather</h1>
      </div>
      <div className='Weather-NavBox'>
        <div className='Weather-NavBox-Row'>
          <Link className='Weather-Link' to='/daily'>
            <div className='Weather-Btn'>Daily</div>
          </Link>
          <Link className='Weather-Link' to='/forecast'>
            <div className='Weather-Btn'>5 Day Forecast</div>
          </Link>
        </div>
        <div className='Weather-NavBox-Row'>
          <Link className='Weather-Link' to='/hourly'>
            <div className='Weather-Btn'>Hourly</div>
          </Link>
          <Link className='Weather-Link' to='/minutely'>
            <div className='Weather-Btn'>Minutely</div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Weather;
