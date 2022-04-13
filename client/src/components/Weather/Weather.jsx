import React from 'react';

import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import '../../css/weather.scss';
import '../../css/utils.css';

const Weather = () => {
  return (
    <div className='WeatherPage-Main'>
      <Link className='Link-Weather' to='/calendar'>
        <div className='Btn-Weather'>Back</div>
      </Link>
      <h1 style={{ textAlign: 'center' }}>Weather</h1>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <div className='Weather-NavBox'>
          <div className='Weather-NavBox-Row'>
            <Link className='Link-Weather' to='/daily'>
              <div className='Btn-Weather'>Daily</div>
            </Link>
            <Link className='Link-Weather' to='/forecast'>
              <div className='Btn-Weather'>5 Day Forecast</div>
            </Link>
          </div>
          <div className='Weather-NavBox-Row'>
            <Link className='Link-Weather' to='/hourly'>
              <div className='Btn-Weather'>Hourly</div>
            </Link>
            <Link className='Link-Weather' to='/minutely'>
              <div className='Btn-Weather'>Minutely</div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
