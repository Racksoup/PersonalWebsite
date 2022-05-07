import React, { useEffect, useState } from 'react';
import '../../css/weather.scss';
import { getOneCallWeather } from '../../actions/weather';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

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
      <div className='Weather'>
        <h1 className='Title'>Minutely Precipitation</h1>
        <div className='Minutely'>
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
