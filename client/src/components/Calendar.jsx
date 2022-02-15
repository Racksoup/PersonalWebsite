import React, { Fragment } from 'react';

import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import '../css/utils.css';

const Calendar = () => {
  return (
    <Fragment>
      <div className='MainWin'>
        <Button>
          <Link style={{ color: 'white' }} to='/weather'>
            Weather
          </Link>
        </Button>
      </div>
    </Fragment>
  );
};

export default Calendar;
