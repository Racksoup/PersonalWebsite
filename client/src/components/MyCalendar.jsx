import React, { useEffect, useState } from 'react';
import {
  getOneJournal,
  getOneJournalByDate,
  clearJournals,
  getMonthsJournals,
} from '../actions/journal';
import '../css/calendar.scss';

import DatePicker from 'react-date-picker';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const MyCalendar = ({
  getOneJournal,
  getOneJournalByDate,
  clearJournals,
  getMonthsJournals,
  journals,
}) => {
  useEffect(() => {
    getMonthsJournals(new Date());
  }, []);

  const [calendarLayout, toggleCalendarLayout] = useState(0);
  const [dateValue, setDateValue] = useState(new Date());
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

  const findFirstDayOfMonth = (day) => {
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

  const currentMonth = monthsOfYear[dateValue.getMonth()];
  const currentYear = dateValue.getFullYear();

  let firstDay = findFirstDayOfMonth(dateValue);

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
    // add prev month
    // add prev month
    for (let i = prevMonthNumDays - firstDay[1] + 1; i < prevMonthNumDays + 1; i++) {
      // format thisDaysDate (month issue)
      let thisDaysDate;
      if (firstDay[2] === 10 || firstDay[2] === 11) {
        thisDaysDate = new Date(`${firstDay[5]}-${firstDay[2]}-${i}T05:00:00`);
      } else {
        thisDaysDate = new Date(`${firstDay[5]}-0${firstDay[2]}-${i}T05:00:00`);
      }

      let journalIndex = null;
      journals.map((journal, k) => {
        let journalDay = new Date(journal.date);
        if (
          journalDay.getDate() === thisDaysDate.getDate() &&
          journalDay.getMonth() === thisDaysDate.getMonth() &&
          journalDay.getFullYear() === thisDaysDate.getFullYear()
        )
          journalIndex = k;
      });
      daysOfMonth.push({ dayOfMonth: i, thisDaysDate, journalIndex });
    }

    // add curr month
    // add curr month
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
      if (firstDay[2] === 9 || firstDay[2] === 10) {
        thisDaysDate = new Date(`${firstDay[5]}-${firstDay[2] + 1}-${x}T05:00:00`);
      } else if (firstDay[2] === 11) {
        thisDaysDate = new Date(`${firstDay[5]}-${firstDay[2] - 10}-${x}T05:00:00`);
      } else {
        thisDaysDate = new Date(`${firstDay[5]}-0${firstDay[2] + 1}-${x}T05:00:00`);
      }

      let journalIndex = null;
      journals.map((journal, k) => {
        let journalDay = new Date(journal.date);
        if (
          journalDay.getDate() === thisDaysDate.getDate() &&
          journalDay.getMonth() === thisDaysDate.getMonth() &&
          journalDay.getFullYear() === thisDaysDate.getFullYear()
        )
          journalIndex = k;
      });

      // push
      daysOfMonth.push({ dayOfMonth: (i + 1).toString(), thisDaysDate, journalIndex });
    }

    // add next month
    // add next month
    // add next month
    const startValDaysOfMonth = daysOfMonth.length;
    for (let i = daysOfMonth.length; i < 6 * 7; i++) {
      let x;
      if (i < 9 + startValDaysOfMonth) {
        x = `0${i - startValDaysOfMonth + 1}`;
      } else if (i === 9 + startValDaysOfMonth) {
        x = 10;
      } else {
        x = i - startValDaysOfMonth + 1;
      }

      let thisDaysDate;
      if (firstDay[2] === 8 || firstDay[2] === 9) {
        thisDaysDate = new Date(`${firstDay[5]}-${firstDay[2] + 2}-${x}T05:00:00`);
      } else if (firstDay[2] === 10 || firstDay[2] === 11) {
        thisDaysDate = new Date(`${firstDay[5]}-${firstDay[2] - 10}-${x}T05:00:00`);
      } else {
        thisDaysDate = new Date(`${firstDay[5]}-0${firstDay[2] + 2}-${x}T05:00:00`);
      }

      let journalIndex = null;
      journals.map((journal, k) => {
        let journalDay = new Date(journal.date);
        if (
          journalDay.getDate() === thisDaysDate.getDate() &&
          journalDay.getMonth() === thisDaysDate.getMonth() &&
          journalDay.getFullYear() === thisDaysDate.getFullYear()
        )
          journalIndex = k;
      });
      daysOfMonth.push({
        dayOfMonth: (i + 1 - startValDaysOfMonth).toString(),
        thisDaysDate,
        journalIndex,
      });
    }
    return daysOfMonth;
  };

  const todayClicked = (journal, date) => {
    getOneJournalByDate(journal, date);
  };

  const leftMonthButtonClicked = () => {
    let currDate = new Date(dateValue);
    currDate.setMonth(currDate.getMonth() - 1);
    currDate.setDate(1);
    setDateValue(currDate);
  };

  const rightMonthButtonClicked = () => {
    let currDate = new Date(dateValue);
    currDate.setMonth(currDate.getMonth() + 1);
    currDate.setDate(1);
    setDateValue(currDate);
  };

  const leftYearButtonClicked = () => {
    let currDate = new Date(dateValue);
    currDate.setFullYear(currDate.getFullYear() - 1);
    currDate.setMonth(0);
    currDate.setDate(1);
    setDateValue(currDate);
  };

  const rightYearButtonClicked = () => {
    let currDate = new Date(dateValue);
    currDate.setFullYear(currDate.getFullYear() + 1);
    currDate.setMonth(0);
    currDate.setDate(1);
    setDateValue(currDate);
  };

  const leftCenturyButtonClicked = () => {
    let currDate = new Date(dateValue);
    currDate.setFullYear(currDate.getFullYear() - 100);
    currDate.setMonth(0);
    currDate.setDate(1);
    setDateValue(currDate);
  };

  const rightCenturyButtonClicked = () => {
    let currDate = new Date(dateValue);
    currDate.setFullYear(Math.floor(currDate.getFullYear() / 100) * 100 + 100);
    currDate.setMonth(0);
    currDate.setDate(1);
    setDateValue(currDate);
  };

  const monthItemClicked = (month) => {
    let newDate = new Date(dateValue);
    newDate.setMonth(month);
    newDate.setDate(1);
    setDateValue(newDate);
    toggleCalendarLayout(0);
  };

  const yearClicked = (year) => {
    let newDate = new Date(dateValue);
    newDate.setFullYear(parseInt(year));
    newDate.setMonth(0);
    newDate.setDate(1);
    setDateValue(newDate);
    toggleCalendarLayout(1);
  };

  const printYears = () => {
    let preYear = Math.floor(currentYear / 100);
    let arr = [];
    for (let i = 0; i < 100; i++) {
      let postYear = i.toString();
      if (i < 10) {
        postYear = `0${i}`;
      }
      let fullYear = preYear + postYear;
      console.log(fullYear);
      arr.push(
        <div className='Calendar-YearItem' onClick={() => yearClicked(fullYear)}>
          {fullYear}
        </div>
      );
    }
    return arr;
  };

  let daysOfMonth = buildMonthArr(firstDay);

  // Calendar Layout Main
  if (calendarLayout == 0) {
    return (
      <div className='Calendar-MainWin'>
        <div className='Calendar-TitleGrid'>
          <DatePicker className='datePicker' onChange={setDateValue} value={dateValue} />
          <div className='Calendar-Title-MonthFlex'>
            <div className='Calendar_Button_MonthNav' onClick={() => leftMonthButtonClicked()}>
              <FontAwesomeIcon icon={faChevronLeft} />
            </div>
            <p className='Calendar-Title' onClick={() => toggleCalendarLayout(1)}>
              {currentMonth} - {currentYear}
            </p>
            <div className='Calendar_Button_MonthNav' onClick={() => rightMonthButtonClicked()}>
              <FontAwesomeIcon icon={faChevronRight} />
            </div>
          </div>
        </div>
        <div className='Calendar-Grid'>
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
                  <Link to='/journal-view' style={{ color: 'white', textDecoration: 'none' }}>
                    <button
                      className='CalendarDayButton'
                      onClick={() => todayClicked(journals[day.journalIndex], day.thisDaysDate)}
                    >
                      {journals[day.journalIndex] &&
                        journals[day.journalIndex].image_filename !== undefined && (
                          <img
                            src={`api/journal/image/${journals[day.journalIndex].image_filename}`}
                            style={{
                              height: '100%',
                              width: '100%',
                              position: 'relative',
                              border: '0',
                            }}
                          />
                        )}
                      <div style={{ position: 'absolute' }}>
                        <p style={{ width: '2rem' }}>{day.dayOfMonth}</p>
                        {journals[day.journalIndex] && <p>{journals[day.journalIndex].title}</p>}
                      </div>
                    </button>
                  </Link>
                </div>
              );
            })}
        </div>
      </div>
    );
  }

  // Calendar Layout Month Selector
  if (calendarLayout == 1) {
    return (
      <div className='Calendar-MainWin'>
        <div className='Calendar-TitleGrid'>
          <DatePicker className='datePicker' onChange={setDateValue} value={dateValue} />
          <div className='Calendar-Title-MonthFlex'>
            <div className='Calendar_Button_MonthNav' onClick={() => leftYearButtonClicked()}>
              <FontAwesomeIcon icon={faChevronLeft} />
            </div>
            <p className='Calendar-Title-MonthLayout' onClick={() => toggleCalendarLayout(2)}>
              {currentYear}
            </p>
            <div className='Calendar_Button_MonthNav' onClick={() => rightYearButtonClicked()}>
              <FontAwesomeIcon icon={faChevronRight} />
            </div>
          </div>
        </div>
        <div className='Calendar-MonthGrid'>
          {monthsOfYear.map((month, i) => {
            return (
              <div className='Calendar-MonthItem' onClick={() => monthItemClicked(i)}>
                {month}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // Calendar Layout Year Selector
  if (calendarLayout == 2) {
    return (
      <div className='Calendar-MainWin'>
        <div className='Calendar-TitleGrid'>
          <DatePicker className='datePicker' onChange={setDateValue} value={dateValue} />
          <div className='Calendar-Title-MonthFlex'>
            <div className='Calendar_Button_MonthNav' onClick={() => leftCenturyButtonClicked()}>
              <FontAwesomeIcon icon={faChevronLeft} />
            </div>
            <p className='Calendar-Title-YearLayout'>
              {`${Math.floor(currentYear / 100)}00 - ${Math.floor(currentYear / 100) + 1}00`}
            </p>
            <div className='Calendar_Button_MonthNav' onClick={() => rightCenturyButtonClicked()}>
              <FontAwesomeIcon icon={faChevronRight} />
            </div>
          </div>
        </div>
        <div className='Calendar-YearGrid'>{printYears()}</div>
      </div>
    );
  }
};

MyCalendar.propTypes = {
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
})(MyCalendar);
