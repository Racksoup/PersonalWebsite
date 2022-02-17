import React, { useState } from 'react';
import '../css/utils.css';
import '../css/journal.css';
import PictureModal from './Modal';
import { createJournalPost, toggleModal } from '../actions/journal';

import Textarea from 'react-textarea-autosize';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const SingleJournalEntry = ({ createJournalPost, toggleModal }) => {
  const [newJournal, setNewJournal] = useState({
    title: '',
    text: '',
  });
  const [newFile, setNewFile] = useState('');
  const [redirect, setRedirect] = useState(false);

  const { title, text } = newJournal;

  const onChange = (e) => {
    setNewJournal({ ...newJournal, [e.target.name]: e.target.value });
  };

  const onFileChange = (e) => {
    setNewFile(e.target.files[0]);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (title !== '' && text !== '' && newFile !== '') {
      createJournalPost(newJournal, newFile);
      setRedirect(true);
    }
  };

  if (redirect) {
    return <Redirect to='/calendar' />;
  }

  return (
    <div className='MainWin'>
      <PictureModal />
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button>
          <Link to='calendar' style={{ color: 'white' }}>
            Back
          </Link>
        </Button>
        <Button onClick={(e) => onSubmit(e)}>Submit</Button>
      </div>
      <div className='MainEntryFrame'>
        <div className='EditTitle'>
          <input
            className='TitleInput'
            type='text'
            name='title'
            onChange={(e) => onChange(e)}
          ></input>
        </div>
        <div className='JournalEntryButtonsFrame'>
          <div className='ImageEntryFrame'>
            <p className='ImageEntryTitle'>Upload Image:</p>
            <input type='file' name='file' onChange={(e) => onFileChange(e)}></input>
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
          <div className='EditPictureFrame' onClick={(e) => toggleModal(e)}></div>
          <div className='EditPictureFrame' onClick={(e) => toggleModal(e)}></div>
          <div className='EditPictureFrame' onClick={(e) => toggleModal(e)}></div>
          <div className='EditPictureFrame' onClick={(e) => toggleModal(e)}></div>
          <div className='EditPictureFrame' onClick={(e) => toggleModal(e)}></div>
          <div className='EditPictureFrame' onClick={(e) => toggleModal(e)}></div>
          <div className='EditPictureFrame' onClick={(e) => toggleModal(e)}></div>
          <div className='EditPictureFrame' onClick={(e) => toggleModal(e)}></div>
        </div>
        <div className='EditText'>
          <Textarea
            className='EditTextInput'
            type='text'
            name='text'
            onChange={(e) => onChange(e)}
          ></Textarea>
        </div>
      </div>
    </div>
  );
};

SingleJournalEntry.propTypes = {
  toggleModal: PropTypes.func.isRequired,
  createJournalPost: PropTypes.func.isRequired,
};

export default connect(null, { createJournalPost, toggleModal })(SingleJournalEntry);
