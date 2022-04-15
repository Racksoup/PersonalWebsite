import React from 'react';
import MyCalendar from '../MyCalendar.jsx';
import '../../css/LandingPage.scss';

import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className='Home'>
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

export default LandingPage;
