import React, { Fragment } from 'react';

import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import '../css/utils.css';

const Calendar = () => {
  return (
    <Fragment>
      <div className='MainWin'>
        <p className='BigTitle'>Calendar</p>
        <Button>
          <Link style={{ color: 'white', display: 'inline-block' }} to='/weather'>
            Weather
          </Link>
        </Button>
        <Button>
          <Link style={{ color: 'white', display: 'inline-block' }} to='/journal-view'>
            Journal View
          </Link>
        </Button>
        <Button>
          <Link style={{ color: 'white', display: 'inline-block' }} to='/journal-entry'>
            Journal Entry
          </Link>
        </Button>
        <div style={{ height: '84%', paddingTop: '1vh' }}>
          <div className='Calendar'>
            <div className='CalendarDayTitleFrame'>
              <p className='CalendarDayTitle'>Sunday</p>
            </div>
            <div className='CalendarDayTitleFrame'>
              <p className='CalendarDayTitle'>Monday</p>
            </div>
            <div className='CalendarDayTitleFrame'>
              <p className='CalendarDayTitle'>Tuesday</p>
            </div>
            <div className='CalendarDayTitleFrame'>
              <p className='CalendarDayTitle'>Wednesday</p>
            </div>
            <div className='CalendarDayTitleFrame'>
              <p className='CalendarDayTitle'>Thursday</p>
            </div>
            <div className='CalendarDayTitleFrame'>
              <p className='CalendarDayTitle'>Friday</p>
            </div>
            <div className='CalendarDayTitleFrame'>
              <p className='CalendarDayTitle'>Saturday</p>
            </div>
            <div className='CalendarItem'></div>
            <div className='CalendarItem'></div>
            <div className='CalendarItem'></div>
            <div className='CalendarItem'></div>
            <div className='CalendarItem'></div>
            <div className='CalendarItem'></div>
            <div className='CalendarItem'></div>
            <div className='CalendarItem'></div>
            <div className='CalendarItem'></div>
            <div className='CalendarItem'></div>
            <div className='CalendarItem'></div>
            <div className='CalendarItem'></div>
            <div className='CalendarItem'></div>
            <div className='CalendarItem'></div>
            <div className='CalendarItem'></div>
            <div className='CalendarItem'></div>
            <div className='CalendarItem'></div>
            <div className='CalendarItem'></div>
            <div className='CalendarItem'></div>
            <div className='CalendarItem'></div>
            <div className='CalendarItem'></div>
            <div className='CalendarItem'></div>
            <div className='CalendarItem'></div>
            <div className='CalendarItem'></div>
            <div className='CalendarItem'></div>
            <div className='CalendarItem'></div>
            <div className='CalendarItem'></div>
            <div className='CalendarItem'></div>
            <div className='CalendarItem'></div>
            <div className='CalendarItem'></div>
            <div className='CalendarItem'></div>
            <div className='CalendarItem'></div>
            <div className='CalendarItem'></div>
            <div className='CalendarItem'></div>
            <div className='CalendarItem'></div>
            <div className='CalendarItem'></div>
            <div className='CalendarItem'></div>
            <div className='CalendarItem'></div>
            <div className='CalendarItem'></div>
            <div className='CalendarItem'></div>
            <div className='CalendarItem'></div>
            <div className='CalendarItem'></div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Calendar;
