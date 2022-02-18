import React, { Fragment, useEffect } from 'react';
import {
  getOneJournal,
  getOneJournalByDate,
  clearJournals,
  getMonthsJournals,
} from '../actions/journal';

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import '../css/utils.css';
import axios from 'axios';

const Calendar = ({
  getOneJournal,
  getOneJournalByDate,
  clearJournals,
  getMonthsJournals,
  journals,
}) => {
  useEffect(() => {
    getMonthsJournals(new Date());
  }, []);
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
    const firstDayName = days[7 - subDays];
    const firstDayArrIndex = 7 - subDays;
    const Year = day.getFullYear();
    const firstDay = [firstDayName, firstDayArrIndex, Month, MonthString, DaysInMonth, Year];
    return firstDay;
  };

  const currentMonth = monthsOfYear[new Date().getMonth()];

  let firstDay = findFirstDayOfWeek(new Date());

  const buildMonthArr = (firstDay) => {
    const daysOfMonth = [];
    let prevMonthNumDays;

    // set prevMonthNumDays, if month = 0(jan) set it to dec
    if (firstDay[2] === 0) {
      prevMonthNumDays = numOfDaysInMonth['December'];
    } else {
      prevMonthNumDays = numOfDaysInMonth[monthsOfYear[firstDay[2] - 1]];
    }

    // add prev month
    for (let i = prevMonthNumDays; i > prevMonthNumDays - firstDay[1]; i--) {
      // format thisDaysDate (month issue)
      let thisDaysDate;
      if (firstDay[2] === 9 || firstDay[2] === 10 || firstDay[2] === 11) {
        thisDaysDate = new Date(`${firstDay[5]}-${firstDay[2]}-${i}T05:00:00`);
      } else {
        thisDaysDate = new Date(`${firstDay[5]}-0${firstDay[2]}-${i}T05:00:00`);
      }
      daysOfMonth.push([i]);
    }

    // add curr month
    for (let i = 0; i < firstDay[4]; i++) {
      let x;
      if (i < 9) {
        x = `0${i + 1}`;
      } else if (i === 9) {
        x = 10;
      } else {
        x = i + 1;
      }

      // format thisDaysDate (month issue)
      let thisDaysDate;
      if (firstDay[2] === 9 || firstDay[2] === 10 || firstDay[2] === 11) {
        thisDaysDate = new Date(`${firstDay[5]}-${firstDay[2] + 1}-${x}T05:00:00`);
      } else {
        thisDaysDate = new Date(`${firstDay[5]}-0${firstDay[2] + 1}-${x}T05:00:00`);
      }

      // push
      if (new Date().getDate() === i + 1) {
        daysOfMonth.push(['TODAY', thisDaysDate]);
      } else {
        daysOfMonth.push([(i + 1).toString(), thisDaysDate]);
      }
    }

    // add next month
    const startValDaysOfMonth = daysOfMonth.length;
    for (let i = daysOfMonth.length; i < 6 * 7; i++) {
      daysOfMonth.push([(i + 1 - startValDaysOfMonth).toString()]);
    }
    return daysOfMonth;
  };

  const todayClicked = (today) => {
    console.log(today);
    getOneJournalByDate(today);
  };

  let daysOfMonth = buildMonthArr(firstDay);

  return (
    <Fragment>
      <div className='MainWin'>
        <p className='BigTitle'>{currentMonth}</p>
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
            {daysOfMonth &&
              journals &&
              daysOfMonth.map((day) => {
                return (
                  <div className='CalendarItem'>
                    <button className='CalendarDayButton' onClick={() => todayClicked(day[1])}>
                      {day[0]}
                    </button>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

Calendar.propTypes = {
  getOneJournal: PropTypes.func.isRequired,
  getOneJournalByDate: PropTypes.func.isRequired,
  clearJournals: PropTypes.func.isRequired,
  getMonthsJournals: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  journal: state.journal.journal,
  journals: state.journal.journals,
});

export default connect(mapStateToProps, {
  getOneJournal,
  getOneJournalByDate,
  clearJournals,
  getMonthsJournals,
})(Calendar);
