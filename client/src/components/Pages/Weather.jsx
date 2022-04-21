import React, { useState } from 'react';
import '../../css/weather.scss';
import Daily from '../Weather/Daily';
import Forecast from '../Weather/Forecast';
import Hourly from '../Weather/Hourly';
import Minutely from '../Weather/Minutely';

import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const Weather = ({ isAuthenticated, loading }) => {
  const [layout, toggleLayout] = useState();

  if (!isAuthenticated && !loading) {
    return <Redirect to='/' />;
  }

  return (
    <div className='Section'>
      <div className='TitleBox'>
        <Link className='Link' to='/home'>
          <div className='Btn'>Back</div>
        </Link>
        <h1 className='TitleBox-Title'>Weather</h1>
        <div style={{ width: '7rem' }} />
      </div>
      <div className='Nav'>
        <div className='Btn' onClick={() => toggleLayout(0)}>
          Daily
        </div>
        <div className='Btn' onClick={() => toggleLayout(1)}>
          5 Day Forecast
        </div>
        <div className='Btn' onClick={() => toggleLayout(2)}>
          Hourly
        </div>
        <div className='Btn' onClick={() => toggleLayout(3)}>
          Minutely
        </div>
      </div>
      {layout === 0 && <Daily />}
      {layout === 1 && <Forecast />}
      {layout === 2 && <Hourly />}
      {layout === 3 && <Minutely />}
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading,
});

export default connect(mapStateToProps, {})(Weather);
