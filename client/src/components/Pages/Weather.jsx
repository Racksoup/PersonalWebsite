import React from 'react';

import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import '../../css/weather.scss';

const Weather = ({ isAuthenticated, loading }) => {
  if (!isAuthenticated && !loading) {
    return <Redirect to='/' />;
  }

  return (
    <div className='WeatherPage-Main'>
      <div className='Weather-TitleBox'>
        <Link className='Weather-Link' to='/home'>
          <div className='Weather-Btn Weather-BackBtn'>Back</div>
        </Link>
        <h1 className='Weather-Title'>Weather</h1>
      </div>
      <div className='Weather-NavBox'>
        <div className='Weather-NavBox-Row'>
          <Link className='Weather-Link' to='/daily'>
            <div className='Weather-Btn'>Daily</div>
          </Link>
          <Link className='Weather-Link' to='/forecast'>
            <div className='Weather-Btn'>5 Day Forecast</div>
          </Link>
        </div>
        <div className='Weather-NavBox-Row'>
          <Link className='Weather-Link' to='/hourly'>
            <div className='Weather-Btn'>Hourly</div>
          </Link>
          <Link className='Weather-Link' to='/minutely'>
            <div className='Weather-Btn'>Minutely</div>
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
