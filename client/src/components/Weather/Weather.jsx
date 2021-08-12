import React, { Fragment } from 'react';

import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

const Weather = () => {
  return (
    <Fragment>
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
    </Fragment>
  );
};

export default Weather;
