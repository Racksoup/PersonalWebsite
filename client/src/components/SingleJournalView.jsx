import React from 'react';
import '../css/journal.scss';
import { clearJournal } from '../actions/journal';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

const SingleJournalView = ({ clearJournal, journal }) => {
  if (journal.title === '') {
    return <Redirect to='/journal-entry' />;
  }

  console.log(journal);
  let textArr = [];
  if (journal && journal.text) {
    textArr = journal.text.split('\n\n');
  }
  return (
    <div className='JournalPage'>
      <div className='Journal-View-TitleBox'>
        <Link to='home' className='Journal-Link'>
          <div className='Journal-Btn' onClick={() => clearJournal()}>
            Back
          </div>
        </Link>
        <p className='Journal-View-Title'>{journal.title}</p>
        <Link to='journal-entry' className='Journal-Link'>
          <div className='Journal-Btn'>Edit</div>
        </Link>
      </div>
      <div className='Journal-View-Content'>
        <div className='Journal-PicturesFrame'>
          <img className='Journal-View-Img' src={`api/journal/image/${journal.image_filename}`} />
        </div>
        <div className='TextFrame'>
          {textArr.map((text) => (
            <p>{text}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

SingleJournalView.propTypes = {
  clearJournal: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  journal: state.journal.journal,
});

export default connect(mapStateToProps, {
  clearJournal,
})(SingleJournalView);
