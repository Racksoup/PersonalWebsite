import React from 'react';
import '../../css/JournalView.scss';
import { clearJournal } from '../../actions/journal';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

const JournalView = ({ clearJournal, journal }) => {
  if (journal.title === '') {
    return <Redirect to='/journal-entry' />;
  }

  console.log(journal);
  let textArr = [];
  if (journal && journal.text) {
    textArr = journal.text.split('\n\n');
  }
  return (
    <div className='JournalView'>
      <div className='TitleBox'>
        <Link to='home' className='Link'>
          <div className='Btn' onClick={() => clearJournal()}>
            Back
          </div>
        </Link>
        <p className='Title'>{journal.title}</p>
        <Link to='journal-entry' className='Link'>
          <div className='Btn'>Edit</div>
        </Link>
      </div>
      <div className='Content'>
        <div className='PictureFrame'>
          <img className='Img' src={`api/journal/image/${journal.image_filename}`} />
        </div>
        <div className='Text'>
          {textArr.map((text) => (
            <p>{text}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

JournalView.propTypes = {
  clearJournal: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  journal: state.journal.journal,
});

export default connect(mapStateToProps, {
  clearJournal,
})(JournalView);
