import React from 'react';
import MyCalendar from '../MyCalendar.jsx';
import '../../css/LandingPage.scss';

import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const LandingPage = ({ isAuthenticated, loading }) => {
  if (!isAuthenticated && !loading) {
    return <Redirect to='/' />;
  }

  return (
    <div className='Home'>
      <authComp />
      <div className='Home-Nav'>
        <Link className='Home-Link' to='/weather'>
          <div className='Home-Btn'>Weather</div>
        </Link>
        <Link className='Home-Link' to='/lists'>
          <div className='Home-Btn'>Lists</div>
        </Link>
      </div>
      <MyCalendar />
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading,
});

export default connect(mapStateToProps, {})(LandingPage);
