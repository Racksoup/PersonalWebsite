import React, { Fragment, useEffect } from 'react';
import { loadUser } from './actions/auth';
import './App.css';
import Calendar from './components/Calendar.jsx';
import Login from './components/Login';
import Forecast from './components/Weather/Forecast';
import Weather from './components/Weather/Weather';
import Minutely from './components/Weather/Minutely';
import Hourly from './components/Weather/Hourly';
import Daily from './components/Weather/Daily';

import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import PropTypes from 'prop-types';
import { getOneCallWeather } from './actions/weather';

const Base = ({ loadUser, getOneCallWeather }) => {
  useEffect(() => {
    loadUser();
    getOneCallWeather();
  }, []);

  return (
    <Fragment>
      <section className='Background'></section>
      <section className='App'>
        <Switch>
          <Route exact path='/' component={Login} />
          <Route exact path='/calendar' component={Calendar} />
          <Route exact path='/forecast' component={Forecast} />
          <Route exact path='/weather' component={Weather} />
          <Route exact path='/minutely' component={Minutely} />
          <Route exact path='/hourly' component={Hourly} />
          <Route exact path='/daily' component={Daily} />
        </Switch>
      </section>
    </Fragment>
  );
};

Base.propTypes = {
  loadUser: PropTypes.func.isRequired,
  getOneCallWeather: PropTypes.func.isRequired,
};

export default connect(null, { loadUser, getOneCallWeather })(Base);
