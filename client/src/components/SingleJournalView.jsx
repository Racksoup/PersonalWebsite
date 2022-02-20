import React, { useState } from 'react';
import '../css/utils.css';
import '../css/journal.css';
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
  console.log(journal.title);
  return (
    <div className='MainWin'>
      <Button onClick={() => clearJournal()}>
        <Link to='calendar' style={{ color: 'white' }}>
          Back
        </Link>
      </Button>
      <Button>
        <Link to='journal-entry' style={{ color: 'white' }}>
          Edit
        </Link>
      </Button>

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
