import React, { Fragment, useEffect, useState } from 'react';
import '../../css/weather.scss';
import { getOneCallWeather } from '../../actions/weather';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

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
      <div className='WeatherPage-Main'>
        <div className='Weather-TitleBox'>
          <Link className='Weather-Link' to='/weather'>
            <div className='Weather-Btn Weather-BackBtn'>Back</div>
          </Link>
          <h1 className='Weather-Title'>Minutely Precipitation</h1>
        </div>
        <div className='Minute-Flex'>
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
