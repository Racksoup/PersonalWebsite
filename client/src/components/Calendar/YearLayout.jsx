import React from 'react';
import '../../css/calendar.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const YearLayout = ({
  rightCenturyButtonClicked,
  leftCenturyButtonClicked,
  printYears,
  currentYear,
}) => {
  return (
    <div className='Calendar'>
      <div className='TitleBox'>
        <div className='MonthNavBtn' onClick={() => leftCenturyButtonClicked()}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </div>
        <p className='Title-Year'>
          {`${Math.floor(currentYear / 100)}00 - ${Math.floor(currentYear / 100) + 1}00`}
        </p>
        <div className='MonthNavBtn' onClick={() => rightCenturyButtonClicked()}>
          <FontAwesomeIcon icon={faChevronRight} />
        </div>
      </div>
      <div className='Grid-Year'>{printYears()}</div>
    </div>
  );
};

export default YearLayout;
