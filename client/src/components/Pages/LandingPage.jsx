import React from 'react';
import MyCalendar from '../MyCalendar.jsx';
import '../../css/LandingPage.scss';

import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className='Home'>
      <Link className='Link-WeatherNav' to='/weather'>
        <div className='Btn-WeatherNav'>Weather</div>
      </Link>
      <MyCalendar />
    </div>
  );
};

export default LandingPage;
