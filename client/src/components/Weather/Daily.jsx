import React, { Fragment, useState, useEffect } from 'react';
import '../../css/weather.scss';
import { getOneCallWeather } from '../../actions/weather';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Table from 'react-bootstrap/Table';

const Daily = ({ daily, getOneCallWeather }) => {
  useEffect(() => {
    getOneCallWeather();
  }, []);

  if (daily) {
    return (
      <div className='Section'>
        <h1 className='Weather-Title'>Daily</h1>
        <Table bordered variant='dark' style={{ width: '80%', margin: 'auto', marginTop: '20px' }}>
          <thead>
            <tr style={{ color: 'white' }}>
              <th>Day</th>
              <th>Max Temp</th>
              <th>Min Temp</th>
              <th>Pressure</th>
              <th>Humidity</th>
              <th>Wind Speed</th>
              <th>Weather</th>
              <th>Clouds</th>
              <th>Rain</th>
              <th>Pop</th>
              <th>Sunrise</th>
              <th>Sunset</th>
              <th>Moonrise</th>
              <th>Moonset</th>
              <th>Moon Phase</th>
            </tr>
          </thead>
          <tbody>
            {daily.map((day) => {
              let theDay = new Date(day.dt * 1000)
                .toLocaleString()
                .split(' ')
                .shift()
                .replace(/,/g, '');
              theDay = theDay.substring(theDay.length - 7, theDay.length - 5);
              let sunrise = new Date(day.sunrise * 1000).toLocaleString().split(' ');
              sunrise.shift();
              sunrise[0] = sunrise[0].substring(0, sunrise[0].length - 3);
              let sunset = new Date(day.sunset * 1000).toLocaleString().split(' ');
              sunset.shift();
              sunset[0] = sunset[0].substring(0, sunset[0].length - 3);
              let moonrise = new Date(day.moonrise * 1000).toLocaleString().split(' ');
              moonrise.shift();
              moonrise[0] = moonrise[0].substring(0, moonrise[0].length - 3);
              let moonset = new Date(day.moonset * 1000).toLocaleString().split(' ');
              moonset.shift();
              moonset[0] = moonset[0].substring(0, moonset[0].length - 3);
              let clouds = <div>&#9728;</div>;
              if (day.clouds > 32) {
                clouds = <div>&#127780;</div>;
              }
              if (day.clouds > 66) {
                clouds = <div>&#9729;</div>;
              }
              return (
                <tr style={{ color: 'white' }}>
                  <td>{theDay}</td>
                  <td>{(day.temp.max - 273.15).toFixed(1)}&#176;</td>
                  <td>{(day.temp.min - 273.15).toFixed(1)}&#176;</td>
                  <td>{day.pressure}</td>
                  <td>{day.humidity}%</td>
                  <td>{day.wind_speed}</td>
                  <td>{day.weather[0].main}</td>
                  <td>{clouds}</td>
                  <td>{day.rain}</td>
                  <td>{Math.round(day.pop * 100)}%</td>
                  <td>{sunrise}</td>
                  <td>{sunset}</td>
                  <td>{moonrise}</td>
                  <td>{moonset}</td>
                  <td>{Math.round(day.moon_phase * 100)}%</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    );
  } else return null;
};

Daily.propTypes = {
  daily: PropTypes.array,
  getOneCallWeather: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  daily: state.weather.daily,
});

export default connect(mapStateToProps, { getOneCallWeather })(Daily);
