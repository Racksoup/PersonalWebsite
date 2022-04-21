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
    <div className='Section'>
      <div className='TitleBox'>
        <Link className='Link' to='/weather'>
          <div className='Btn'>Weather</div>
        </Link>
        <div className='TitleBox-Title'>Home</div>
        <Link className='Link' to='/lists'>
          <div className='Btn'>Lists</div>
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
