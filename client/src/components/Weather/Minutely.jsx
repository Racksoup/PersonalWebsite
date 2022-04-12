import React, { Fragment, useEffect, useState } from 'react';
import '../../css/weather.scss';
import '../../css/utils.css';
import { getOneCallWeather } from '../../actions/weather';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

const Minutely = ({ minutely, getOneCallWeather }) => {
  useEffect(() => {
    getOneCallWeather();
  }, []);

  const [date, setDate] = useState(
    new Date().toLocaleString('en-US', { timeZone: 'America/New_York' })
  );

  let currMinute = date.split(' ');
  currMinute = currMinute[1];
  currMinute = currMinute.substring(0, currMinute.length - 3);
  currMinute = currMinute.substring(currMinute.length - 2, currMinute.length);
  let tagMin = currMinute;

  if (minutely) {
    return (
      <div className='WeatherPage'>
        <div style={{ display: 'flex', overflow: 'hidden' }}>
          <div style={{ width: '0px' }}>
            <Button>
              <Link style={{ color: 'white' }} to='/weather'>
                Back
              </Link>
            </Button>
          </div>
          <h1 style={{ margin: 'auto' }}>Minutely Precipitation</h1>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            height: '245px',
            flexWrap: 'wrap',
            marginTop: '30px',
          }}
        >
          {minutely.map((minute, i) => {
            if (tagMin > 59) {
              tagMin = 0;
            }
            tagMin++;
            if (i !== 60) {
              return (
                <div style={{ display: 'flex' }}>
                  Min {tagMin}: {minute.precipitation}
                </div>
              );
            } else return null;
          })}
        </div>
      </div>
    );
  } else return null;
};

Minutely.propTypes = {
  minutely: PropTypes.array,
  getOneCallWeather: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  minutely: state.weather.minutely,
});

export default connect(mapStateToProps, { getOneCallWeather })(Minutely);
