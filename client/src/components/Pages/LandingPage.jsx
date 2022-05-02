import React from 'react';
import MyCalendar from '../MyCalendar.jsx';
import TitleBox from '../TitleBox.jsx';
import '../../css/LandingPage.scss';

import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const LandingPage = ({ isAuthenticated, loading }) => {
  if (!isAuthenticated && !loading) {
    return <Redirect to='/' />;
  }

  return (
    <div className='Section'>
      <TitleBox name='Home' />
      <MyCalendar />
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading,
});

export default connect(mapStateToProps, {})(LandingPage);
