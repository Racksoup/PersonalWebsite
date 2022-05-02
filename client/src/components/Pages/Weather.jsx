import React, { useState } from 'react';
import '../../css/weather.scss';
import Daily from '../Weather/Daily';
import Forecast from '../Weather/Forecast';
import Hourly from '../Weather/Hourly';
import Minutely from '../Weather/Minutely';
import TitleBox from '../TitleBox';

import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const Weather = ({ isAuthenticated, loading }) => {
  const [layout, toggleLayout] = useState();

  if (!isAuthenticated && !loading) {
    return <Redirect to='/' />;
  }

  return (
    <div className='Section'>
      <TitleBox name='Weather' />
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
