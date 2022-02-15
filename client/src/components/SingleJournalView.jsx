import React from 'react';
import '../css/utils.css';
import '../css/journal.css';


import { Link } from 'react-router-dom';

const SingleJournalView = () => {
  return (
    <div className='MainWin'>
      <Button style={{ position: 'fixed' }}>
        <Link to='calendar' style={{ color: 'white' }}>
          Back
        </Link>
      </Button>
      <p className='BigTitle'>Journal Title Here</p>
      <div className='MainViewFrame'>
        <div className='PicturesFrame'></div>
        <div className='TextFrame'></div>
      </div>
    </div>
  );
};

export default SingleJournalView;
