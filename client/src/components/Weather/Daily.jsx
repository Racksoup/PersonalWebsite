import React, { useEffect } from 'react';
import '../../css/weather.scss';
import { getOneCallWeather } from '../../actions/weather';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Table from 'react-bootstrap/Table';

const Daily = ({ daily, getOneCallWeather }) => {
  useEffect(() => {
    getOneCallWeather();
  }, []);

  daily.map((day) => {
    day.theDay = new Date(day.dt * 1000).toLocaleString().split(' ').shift().replace(/,/g, '');
    day.theDay = day.theDay.substring(day.theDay.length - 7, day.theDay.length - 5);
    day.theSunrise = new Date(day.sunrise * 1000).toLocaleString().split(' ');
    day.theSunrise.shift();
    day.theSunrise[0] = day.theSunrise[0].substring(0, day.theSunrise[0].length - 3);
    day.theSunset = new Date(day.sunset * 1000).toLocaleString().split(' ');
    day.theSunset.shift();
    day.theSunset[0] = day.theSunset[0].substring(0, day.theSunset[0].length - 3);
    day.theMoonrise = new Date(day.moonrise * 1000).toLocaleString().split(' ');
    day.theMoonrise.shift();
    day.theMoonrise[0] = day.theMoonrise[0].substring(0, day.theMoonrise[0].length - 3);
    day.theMoonset = new Date(day.moonset * 1000).toLocaleString().split(' ');
    day.theMoonset.shift();
    day.theMoonset[0] = day.theMoonset[0].substring(0, day.theMoonset[0].length - 3);
    day.theClouds = <div>&#9728;</div>;
  });

  if (daily) {
    return (
      <div className='Weather'>
        <h1 className='Title'>Daily</h1>
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
            {daily.map((day, i) => {
              if (daily[i].clouds > 32) {
                day.theClouds = <div>&#127780;</div>;
              }
              if (daily[i].clouds > 66) {
                day.theClouds = <div>&#9729;</div>;
              }
              return (
                <tr style={{ color: 'white' }}>
                  <td>{day.theDay}</td>
                  <td>{(day.temp.max - 273.15).toFixed(1)}&#176;</td>
                  <td>{(day.temp.min - 273.15).toFixed(1)}&#176;</td>
                  <td>{day.pressure}</td>
                  <td>{day.humidity}%</td>
                  <td>{day.wind_speed}</td>
                  <td>{day.weather[0].main}</td>
                  <td>{day.theClouds}</td>
                  <td>{day.rain}</td>
                  <td>{Math.round(day.pop * 100)}%</td>
                  <td>{day.theSunrise[0]}</td>
                  <td>{day.theSunset}</td>
                  <td>{day.theMoonrise}</td>
                  <td>{day.theMoonset}</td>
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
