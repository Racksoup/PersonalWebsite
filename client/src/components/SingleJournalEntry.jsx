import React, { useState, useRef } from 'react';
import '../css/journal.scss';
import { createJournalPost, updateJournalPost, clearJournal } from '../actions/journal';

import Textarea from 'react-textarea-autosize';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const SingleJournalEntry = ({ createJournalPost, updateJournalPost, clearJournal, journal }) => {
  const [newJournal, setNewJournal] = useState({
    title: journal.title,
    text: journal.text,
    _id: journal._id,
  });
  const [newFile, setNewFile] = useState('');
  const [redirect, setRedirect] = useState(false);
  const inputFileRef = useRef(null);

  const { title, text } = newJournal;

  const onChange = (e) => {
    setNewJournal({ ...newJournal, [e.target.name]: e.target.value });
  };

  const onFileChange = (e) => {
    setNewFile(e.target.files[0]);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (!journal) {
      if (title !== '' && text !== '' && newFile !== '') {
        createJournalPost(newJournal, newFile);
        setRedirect(true);
      }
    } else {
      setNewJournal({ ...newJournal, id: journal._id });
      updateJournalPost(newJournal, newFile);
      setRedirect(true);
    }
  };

  const inputClicked = () => {
    inputFileRef.current.click();
  };

  if (redirect) {
    return <Redirect to='/home' />;
  }

  if (journal) {
    return (
      <div className='JournalPage'>
        <div className='Journal-View-TitleBox'>
          <div className='Journal-Btn' onClick={() => clearJournal()}>
            <Link className='Journal-Link' to='/home'>
              Back
            </Link>
          </div>
          <input
            className='TitleInput'
            type='text'
            name='title'
            value={title}
            onChange={(e) => onChange(e)}
          />
          <div className='Journal-Btn' onClick={(e) => onSubmit(e)}>
            Submit
          </div>
        </div>
        <div className='Journal-Entry-Content'>
          <div className='JournalEntryButtonsFrame'>
            <div className='ImageEntryFrame'>
              {newFile.name ? (
                <p className='ImageEntryTitle'>{newFile.name}</p>
              ) : (
                <p className='ImageEntryTitle'>Upload Image:</p>
              )}
              <input
                className='Journal-Entry-ImgInput'
                type='file'
                name='file'
                ref={inputFileRef}
                onChange={(e) => onFileChange(e)}
              ></input>
              <div className='Journal-Entry-ImgInput-Btn' onClick={() => inputClicked()} />
            </div>
          </div>
          <div className='EditPictures'>
            <div className='EditPictureFrame'>
              <img
                style={{ height: '100%', width: '100%' }}
                src={`api/journal/image/${journal.image_filename}`}
              />
            </div>
          </div>
          <div className='EditText'>
            <Textarea
              className='EditTextInput'
              type='text'
              name='text'
              value={text}
              onChange={(e) => onChange(e)}
            ></Textarea>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className='MainWin'>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button onClick={() => clearJournal()}>
            <Link to='/home' style={{ color: 'white' }}>
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
              {newFile.name ? (
                <p className='ImageEntryTitle'>{newFile.name}</p>
              ) : (
                <p className='ImageEntryTitle'>Upload Image:</p>
              )}
              <input
                className='Journal-Entry-ImgInput'
                type='file'
                name='file'
                ref={inputFileRef}
                onChange={(e) => onFileChange(e)}
              ></input>
              <div className='Journal-Entry-ImgInput-Btn' onClick={() => inputClicked()} />
            </div>
          </div>
          <div className='EditPictures'>
            <div className='EditPictureFrame'></div>
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
  }
};

SingleJournalEntry.propTypes = {
  createJournalPost: PropTypes.func.isRequired,
  updateJournalPost: PropTypes.func.isRequired,
  journal: PropTypes.object.isRequired,
  clearJournal: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  journal: state.journal.journal,
});

export default connect(mapStateToProps, {
  createJournalPost,
  updateJournalPost,
  clearJournal,
})(SingleJournalEntry);
