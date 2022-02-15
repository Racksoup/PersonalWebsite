import React from 'react';
import '../css/utils.css';
import '../css/journal.css';

import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

const SingleJournalEntry = () => {
  return (
    <div className='MainWin'>
      <Button style={{ position: 'fixed' }}>
        <Link to='calendar' style={{ color: 'white' }}>
          Back
        </Link>
      </Button>
      <p className='BigTitle'>Journal Title Here</p>
      <div className='MainEntryFrame'>
        <div className='EditTitle'>hehe</div>
        <div className='JournalEntryButtonsFrame'>hehe</div>
        <div className='EditPictures'>hehe</div>
        <div className='EditText'>hehe</div>
      </div>
    </div>
  );
};

export default SingleJournalEntry;
