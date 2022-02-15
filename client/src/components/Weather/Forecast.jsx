import React, { Fragment, useEffect, useState } from 'react';
import './weather.css';
import '../../css/utils.css';
import { getFourDay } from '../../actions/weather';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

const Forecast = ({ getFourDay, forecast }) => {
  useEffect(() => {
    getFourDay();
  }, []);

  useEffect(() => {
    if (forecast || forecast !== null || undefined || '') {
      setForecast();
    }
  }, [forecast]);

  const [dayForecast, setDayForecast] = useState({
    day1: '',
    day2: '',
    day3: '',
    day4: '',
    day5: '',
    day6: '',
  });

  const setForecast = () => {
    let previousDay;
    let count = 0;
    let days = {
      0: [],
      1: [],
      2: [],
      3: [],
      4: [],
      5: [],
    };

    forecast.list.map((data) => {
      const timeAndDay = data.dt_txt.split(' ');
      const day = timeAndDay[0].split('-');
      const currentDay = day[2];
      let time = timeAndDay[1].replace(/0/g, '');
      let tag;
      time = time.replace(/:/g, '');
      if (time < 12) {
        tag = 'am';
      } else {
        tag = 'pm';
      }
      if (parseInt(time) > 13) {
        time -= 12;
      }
      if (time === '') {
        time = '12';
      }
      if (!previousDay) {
        previousDay = currentDay;
      }
      if (previousDay !== currentDay) {
        count++;
      }
      days[count].push({
        day: currentDay,
        date: timeAndDay[0],
        time: time,
        temp: data.main.feels_like,
        tag: tag,
        weather: data.weather[0].main,
      });
      previousDay = currentDay;
    });

    setDayForecast({
      ...dayForecast,
      day1: days[0],
      day2: days[1],
      day3: days[2],
      day4: days[3],
      day5: days[4],
      day6: days[5],
    });
  };

  return (
    <Fragment>
      <div className='MainWin'>
        <div style={{ display: 'flex' }}>
          <div style={{ width: '0px' }}>
            <Button>
              <Link style={{ color: 'white' }} to='/weather'>
                Back
              </Link>
            </Button>
          </div>
          <h1 style={{ textAlign: 'center', margin: 'auto' }}>5 Day Forecast</h1>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
          <div className='DayBox'>
            <h4>{dayForecast.day1 && dayForecast.day1[0].day}</h4>
            {dayForecast.day1 &&
              dayForecast.day1.map((hour) => {
                return (
                  <div style={{ display: 'flex', justifyContent: 'space-around', width: '180px' }}>
                    <div style={{ display: 'flex' }}>
                      <div>{hour.time}</div>
                      <div>{hour.tag}</div>
                    </div>
                    <div>{(hour.temp - 273.15).toFixed(2)}</div>
                    <div>{hour.weather}</div>
                  </div>
                );
              })}
          </div>
          <div className='DayBox'>
            <h4>{dayForecast.day2 && dayForecast.day2[0].day}</h4>
            {dayForecast.day2 &&
              dayForecast.day2.map((hour) => {
                return (
                  <div style={{ display: 'flex', justifyContent: 'space-around', width: '180px' }}>
                    <div style={{ display: 'flex' }}>
                      <div>{hour.time}</div>
                      <div>{hour.tag}</div>
                    </div>
                    <div>{(hour.temp - 273.15).toFixed(2)}</div>
                    <div>{hour.weather}</div>
                  </div>
                );
              })}
          </div>
          <div className='DayBox'>
            <h4>{dayForecast.day3 && dayForecast.day3[0].day}</h4>
            {dayForecast.day3 &&
              dayForecast.day3.map((hour) => {
                return (
                  <div style={{ display: 'flex', justifyContent: 'space-around', width: '180px' }}>
                    <div style={{ display: 'flex' }}>
                      <div>{hour.time}</div>
                      <div>{hour.tag}</div>
                    </div>
                    <div>{(hour.temp - 273.15).toFixed(2)}</div>
                    <div>{hour.weather}</div>
                  </div>
                );
              })}
          </div>
          <div className='DayBox'>
            <h4>{dayForecast.day4 && dayForecast.day4[0].day}</h4>
            {dayForecast.day4 &&
              dayForecast.day4.map((hour) => {
                return (
                  <div style={{ display: 'flex', justifyContent: 'space-around', width: '180px' }}>
                    <div style={{ display: 'flex' }}>
                      <div>{hour.time}</div>
                      <div>{hour.tag}</div>
                    </div>
                    <div>{(hour.temp - 273.15).toFixed(2)}</div>
                    <div>{hour.weather}</div>
                  </div>
                );
              })}
          </div>
          <div className='DayBox'>
            <h4>{dayForecast.day5 && dayForecast.day5[0].day}</h4>
            {dayForecast.day5 &&
              dayForecast.day5.map((hour) => {
                return (
                  <div style={{ display: 'flex', justifyContent: 'space-around', width: '180px' }}>
                    <div style={{ display: 'flex' }}>
                      <div>{hour.time}</div>
                      <div>{hour.tag}</div>
                    </div>
                    <div>{(hour.temp - 273.15).toFixed(2)}</div>
                    <div>{hour.weather}</div>
                  </div>
                );
              })}
          </div>
          <div className='DayBox'>
            <h4>{dayForecast.day6 && dayForecast.day6[0].day}</h4>
            {dayForecast.day6 &&
              dayForecast.day6.map((hour) => {
                return (
                  <div style={{ display: 'flex', justifyContent: 'space-around', width: '180px' }}>
                    <div style={{ display: 'flex' }}>
                      <div>{hour.time}</div>
                      <div>{hour.tag}</div>
                    </div>
                    <div>{(hour.temp - 273.15).toFixed(2)}</div>
                    <div>{hour.weather}</div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

Forecast.propTypes = {
  getFourDay: PropTypes.func.isRequired,
  forecast: PropTypes.object,
};

const mapStateToProps = (state) => ({
  forecast: state.weather.forecast,
});

export default connect(mapStateToProps, { getFourDay })(Forecast);
