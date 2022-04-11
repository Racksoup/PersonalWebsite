import React, { Fragment, useEffect } from 'react';
import { loadUser } from './actions/auth';
import './App.css';
import LandingPage from './components/Pages/LandingPage.jsx';
import Login from './components/Login';
import Forecast from './components/Weather/Forecast';
import Weather from './components/Weather/Weather';
import Minutely from './components/Weather/Minutely';
import Hourly from './components/Weather/Hourly';
import Daily from './components/Weather/Daily';
import SingleJournalEntry from './components/SingleJournalEntry';
import SingleJournalView from './components/SingleJournalView';

import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import PropTypes from 'prop-types';
import {
  getFourDay,
  getOneCallWeather,
  getHistorical,
  getSavedWeather,
  postSavedWeather,
} from './actions/weather';

const Base = ({
  gotHistorical,
  gotSavedWeather,
  loadUser,
  getOneCallWeather,
  getFourDay,
  getHistorical,
  getSavedWeather,
  postSavedWeather,
}) => {
  useEffect(() => {
    loadUser();
    getOneCallWeather();
    getFourDay();
    getHistorical();
    getSavedWeather();
  }, []);

  useEffect(() => {
    postSavedWeather();
  }, [gotHistorical, gotSavedWeather]);

  return (
    <Fragment>
      <section className='Background'></section>
      <section className='App'>
        <Switch>
          <Route exact path='/' component={Login} />
          <Route exact path='/home' component={LandingPage} />
          <Route exact path='/forecast' component={Forecast} />
          <Route exact path='/weather' component={Weather} />
          <Route exact path='/minutely' component={Minutely} />
          <Route exact path='/hourly' component={Hourly} />
          <Route exact path='/daily' component={Daily} />
          <Route exact path='/journal-view' component={SingleJournalView} />
          <Route exact path='/journal-entry' component={SingleJournalEntry} />
        </Switch>
      </section>
    </Fragment>
  );
};

Base.propTypes = {
  gotHistorical: PropTypes.bool,
  gotSavedWeather: PropTypes.bool,
  loadUser: PropTypes.func.isRequired,
  getOneCallWeather: PropTypes.func.isRequired,
  getFourDay: PropTypes.func.isRequired,
  getHistorical: PropTypes.func.isRequired,
  getSavedWeather: PropTypes.func.isRequired,
  postSavedWeather: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  gotHistorical: state.weather.gotHistorical,
  gotSavedWeather: state.weather.gotSavedWeather,
});

export default connect(mapStateToProps, {
  loadUser,
  getOneCallWeather,
  getFourDay,
  getHistorical,
  getSavedWeather,
  postSavedWeather,
})(Base);
