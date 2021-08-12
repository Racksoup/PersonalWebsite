import React, { Fragment } from 'react';

import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

const Calendar = () => {
  return (
    <Fragment>
      <div>
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
