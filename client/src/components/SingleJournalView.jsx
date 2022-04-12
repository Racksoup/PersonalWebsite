import React, { useState } from 'react';
import '../css/utils.css';
import '../css/journal.scss';
import PictureModal from './Modal';
import { clearJournal } from '../actions/journal';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const SingleJournalView = ({ clearJournal, journal }) => {
  if (journal.title === '') {
    return <Redirect to='/journal-entry' />;
  }
  return (
    <div className='JournalPage'>
      <Link to='home' className='Journal-Link'>
        <div className='Journal-Btn' onClick={() => clearJournal()}>
          Back
        </div>
      </Link>
      <Link to='journal-entry' className='Journal-Link'>
        <div className='Journal-Btn'>Edit</div>
      </Link>

      <p className='BigTitle'>{journal.title}</p>
      <div className='MainViewFrame'>
        <div className='PicturesFrame'></div>
        <div className='TextFrame'>{journal.text}</div>
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
