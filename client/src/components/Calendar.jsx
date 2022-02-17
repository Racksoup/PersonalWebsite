import React, { Fragment } from 'react';

import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import '../css/utils.css';

const Calendar = () => {
  const monthsOfYear = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const numOfDaysInMonth = {
    January: 31,
    February: 28,
    March: 31,
    April: 30,
    May: 31,
    June: 30,
    July: 31,
    August: 31,
    September: 30,
    October: 31,
    November: 30,
    December: 31,
  };

  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  // wed 21
  // if wednesday -4 from day total. 17. 17 / 7 = 2.4, round down 2.
  // (2 * 7) -17 = 3 . 3 days back from saturday = thursday. 8 - 3 = 5(thursday)

  const findFirstDayOfWeek = (day) => {
    const weekDay = day.getDay() + 1;
    const DayNum = day.getDate();
    const Month = day.getMonth();
    const MonthString = monthsOfYear[day.getMonth()];
    const DaysInMonth = numOfDaysInMonth[MonthString];
    const xday = DayNum - weekDay;
    const div = Math.floor(xday / 7);
    const subDays = xday - div * 7;
    const firstDayTitle = days[7 - subDays];
    const firstDayNum = 7 - subDays;
    const firstDay = [firstDayTitle, firstDayNum, Month, MonthString, DaysInMonth];
    return firstDay;
  };

  let firstDay = findFirstDayOfWeek(new Date());
  console.log(firstDay[0], firstDay[1], firstDay[2], firstDay[3], firstDay[4]);

  const buildMonthArr = (firstDay) => {
    const daysOfMonth = [];
    for (let i = 0; i < firstDay[1]; i++) {
      daysOfMonth.push('No');
    }
    for (let i = 0; i < firstDay[4]; i++) {
      if (new Date().getDate() === i + 1) {
        daysOfMonth.push('TODAY');
        console.log('here');
      } else {
        daysOfMonth.push((i + 1).toString());
      }
    }
    const startValDaysOfMonth = daysOfMonth.length;
    for (let i = daysOfMonth.length; i < 6 * 7; i++) {
      daysOfMonth.push((i + 1 - startValDaysOfMonth).toString());
    }
    return daysOfMonth;
  };

  let daysOfMonth = buildMonthArr(firstDay);

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
            {daysOfMonth.map((day) => {
              return <div className='CalendarItem'>{day}</div>;
            })}
            {/* <div className='CalendarItem'></div>
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
            <div className='CalendarItem'></div> */}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Calendar;
