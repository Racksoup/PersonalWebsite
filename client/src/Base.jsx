import React, { Fragment, useEffect } from 'react';
import { loadUser } from './actions/auth';
import './App.css';
import Calendar from './components/Calendar.jsx';
import Login from './components/Login';

import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import PropTypes from 'prop-types';

const Base = ({ loadUser }) => {
  useEffect(() => {
    loadUser();
  }, []);

  return (
    <Fragment>
      <section className='Background'></section>
      <section className='App'>
        <Switch>
          <Route exact path='/' component={Login} />
          <Route exact path='/calendar' component={Calendar} />
        </Switch>
      </section>
    </Fragment>
  );
};

Base.propTypes = {
  loadUser: PropTypes.func.isRequired,
};

export default connect(null, { loadUser })(Base);
