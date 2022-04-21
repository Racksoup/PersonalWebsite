import React, { useState, useRef } from 'react';
import '../../css/journal.scss';
import { createJournalPost, updateJournalPost, clearJournal } from '../../actions/journal';

import Textarea from 'react-textarea-autosize';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

const SingleJournalEntry = ({
  createJournalPost,
  updateJournalPost,
  clearJournal,
  journal,
  isAuthenticated,
  loading,
}) => {
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

  if (!isAuthenticated && !loading) {
    return <Redirect to='/' />;
  }

  if (journal) {
    return (
      <div className='JournalPage'>
        <div className='Journal-View-TitleBox'>
          <Link className='Journal-Link' to='/home'>
            <div className='Journal-Btn' onClick={() => clearJournal()}>
              Back
            </div>
          </Link>
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
            {journal.image_filename && (
              <img
                className='EditPictureFrame'
                src={`api/journal/image/${journal.image_filename}`}
              />
            )}
          </div>
          <Textarea
            className='Journal-Entry-Input'
            type='text'
            name='text'
            value={text}
            onChange={(e) => onChange(e)}
          ></Textarea>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

const mapStateToProps = (state) => ({
  journal: state.journal.journal,
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading,
});

export default connect(mapStateToProps, {
  createJournalPost,
  updateJournalPost,
  clearJournal,
})(SingleJournalEntry);