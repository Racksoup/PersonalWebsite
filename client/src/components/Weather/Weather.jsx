import React from 'react';

import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import '../../css/weather.scss';
import '../../css/utils.css';

const Weather = () => {
  return (
    <div className='WeatherPage'>
      <Button>
        <Link style={{ color: 'white' }} to='/calendar'>
          Back
        </Link>
      </Button>
      <h1 style={{ textAlign: 'center' }}>Weather</h1>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            height: '200px',
            justifyContent: 'space-between',
          }}
        >
          <Button>
            <Link style={{ color: 'white' }} to='/daily'>
              Daily
            </Link>
          </Button>
          <Button>
            <Link style={{ color: 'white' }} to='/forecast'>
              5 Day Forecast
            </Link>
          </Button>
          <Button>
            <Link style={{ color: 'white' }} to='/hourly'>
              Hourly
            </Link>
          </Button>
          <Button>
            <Link style={{ color: 'white' }} to='/minutely'>
              Minutely
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Weather;
