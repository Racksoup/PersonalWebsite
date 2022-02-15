import React from 'react';
import '../css/utils.css';
import '../css/journal.css';
import Example from './Modal';

import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const SingleJournalEntry = () => {
  return (
    <div className='MainWin'>
      <Example />
      <Button style={{ position: 'fixed' }}>
        <Link to='calendar' style={{ color: 'white' }}>
          Back
        </Link>
      </Button>
      <div className='MainEntryFrame'>
        <div className='EditTitle'>
          <input className='TitleInput'></input>
        </div>
        <div className='JournalEntryButtonsFrame'>
          <div className='ImageEntryFrame'>
            <p className='ImageEntryTitle'>Upload Image:</p>
            <input type='file'></input>
          </div>
        </div>
        <div className='EditPictures'>
          <div className='EditPictureFrame' onClick={(e) => pictureClicked(e)}></div>
          <div className='EditPictureFrame'></div>
          <div className='EditPictureFrame'></div>
          <div className='EditPictureFrame'></div>
          <div className='EditPictureFrame'></div>
          <div className='EditPictureFrame'></div>
          <div className='EditPictureFrame'></div>
          <div className='EditPictureFrame'></div>
          <div className='EditPictureFrame'></div>
          <div className='EditPictureFrame'></div>
        </div>
        <div className='EditText'>hehe</div>
      </div>
    </div>
  );
};

const pictureClicked = (e) => {};

export default SingleJournalEntry;
