import React, { Fragment, useState, useEffect } from 'react';
import { getOneCallWeather } from '../../actions/weather';

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

const Hourly = ({ hourly, getOneCallWeather }) => {
  useEffect(() => {
    getOneCallWeather();
  }, []);

  const [time, setTime] = useState(
    new Date().toLocaleString('en-US', { timeZone: 'America/New_York' })
  );

  let currHour = time.split(' ');
  let dayNight = currHour[2];
  currHour = currHour[1];
  currHour = currHour.substring(0, currHour.length - 6);
  let hourTag = currHour;

  if (hourly) {
    return (
      <Fragment>
        <div style={{ display: 'flex', overflow: 'hidden' }}>
          <div style={{ width: '0px' }}>
            <Button>
              <Link style={{ color: 'white' }} to='/weather'>
                Back
              </Link>
            </Button>
          </div>
          <h1 style={{ margin: 'auto' }}>Hourly</h1>
        </div>
        <Table striped bordered hover style={{ width: '80%', margin: 'auto', marginTop: '20px' }}>
          <thead>
            <tr style={{ color: 'white' }}>
              <th>Hour</th>
              <th>Temp</th>
              <th>Weather</th>
              <th>Humidity</th>
              <th>Pressure</th>
              <th>Wind Speed</th>
              <th>Clouds</th>
            </tr>
          </thead>
          <tbody>
            {hourly.map((hour) => {
              if (hourTag > 11) {
                hourTag = 0;
                if (dayNight === 'pm') {
                  dayNight = 'am';
                }
                if (dayNight === 'am') {
                  dayNight = 'pm';
                }
              }
              hourTag++;
              return (
                <tr style={{ color: 'white' }}>
                  <td>
                    {hourTag}
                    {dayNight}
                  </td>
                  <td>{(hour.feels_like - 273.15).toFixed(2)}</td>
                  <td>{hour.weather[0].main}</td>
                  <td>{hour.humidity}</td>
                  <td>{hour.pressure}</td>
                  <td>{hour.wind_speed}</td>
                  <td>{hour.clouds}%</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Fragment>
    );
  } else return null;
};

Hourly.propTypes = {
  hourly: PropTypes.array,
  getOneCallWeather: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  hourly: state.weather.hourly,
});

export default connect(mapStateToProps, { getOneCallWeather })(Hourly);
