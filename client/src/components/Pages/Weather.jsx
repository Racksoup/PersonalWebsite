import React from 'react';

import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import '../../css/weather.scss';

const Weather = ({ isAuthenticated, loading }) => {
  if (!isAuthenticated && !loading) {
    return <Redirect to='/' />;
  }

  return (
    <div className='Section'>
      <div className='TitleBox'>
        <Link className='Link' to='/home'>
          <div className='Btn'>Back</div>
        </Link>
        <h1 className='Weather-Title'>Weather</h1>
        <div style={{ width: '7rem' }} />
      </div>
      <div className='Weather-NavBox'>
        <div className='Weather-NavBox-Row'>
          <Link className='Link' to='/daily'>
            <div className='Btn'>Daily</div>
          </Link>
          <Link className='Link' to='/forecast'>
            <div className='Btn'>5 Day Forecast</div>
          </Link>
        </div>
        <div className='Weather-NavBox-Row'>
          <Link className='Link' to='/hourly'>
            <div className='Btn'>Hourly</div>
          </Link>
          <Link className='Link' to='/minutely'>
            <div className='Btn'>Minutely</div>
          </Link>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading,
});

export default connect(mapStateToProps, {})(Weather);
