import React from 'react';
import '../css/utils.css';
import '../css/journal.css';
import PictureModal from './Modal';
import { toggleModal } from '../actions/journal';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const SingleJournalEntry = ({ modal, toggleModal }) => {
  return (
    <div className='MainWin'>
      <PictureModal />
      <Button style={{ position: 'absolute' }}>
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
          <div className='EditPictureFrame' onClick={(e) => toggleModal(e)}></div>
          <div className='EditPictureFrame' onClick={(e) => toggleModal(e)}></div>
          <div className='EditPictureFrame' onClick={(e) => toggleModal(e)}></div>
          <div className='EditPictureFrame' onClick={(e) => toggleModal(e)}></div>
          <div className='EditPictureFrame' onClick={(e) => toggleModal(e)}></div>
          <div className='EditPictureFrame' onClick={(e) => toggleModal(e)}></div>
          <div className='EditPictureFrame' onClick={(e) => toggleModal(e)}></div>
          <div className='EditPictureFrame' onClick={(e) => toggleModal(e)}></div>
          <div className='EditPictureFrame' onClick={(e) => toggleModal(e)}></div>
          <div className='EditPictureFrame' onClick={(e) => toggleModal(e)}></div>
        </div>
        <div className='EditText'>hehe</div>
      </div>
    </div>
  );
};

SingleJournalEntry.propTypes = {
  modal: PropTypes.bool.isRequired,
  toggleModal: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  modal: state.journal.modal,
});

export default connect(mapStateToProps, { toggleModal })(SingleJournalEntry);
