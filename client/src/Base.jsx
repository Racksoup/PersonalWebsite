import React, { Fragment, useEffect } from 'react';
import { loadUser } from './actions/auth';
import './App.css';
import './css/Utils.scss';
import LandingPage from './components/Pages/LandingPage.jsx';
import Login from './components/Pages/Login';
import Weather from './components/Pages/Weather';
import JournalEntry from './components/Pages/JournalEntry';
import JournalView from './components/Pages/JournalView';
import Lists from './components/Pages/Lists';
import {
  getFourDay,
  getOneCallWeather,
  getHistorical,
  getSavedWeather,
  postSavedWeather,
} from './actions/weather';

import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import PropTypes from 'prop-types';

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
          <Route exact path='/weather' component={Weather} />
          <Route exact path='/journal-view' component={JournalView} />
          <Route exact path='/journal-entry' component={JournalEntry} />
          <Route exact path='/lists' component={Lists} />
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
