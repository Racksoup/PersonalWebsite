import React, { useState } from 'react';
import { toggleModal } from '../actions/journal';

import { Modal, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

function PictureModal({ modal, toggleModal }) {
  return (
    <>
      <Modal show={modal} onHide={toggleModal}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={toggleModal}>
            Close
          </Button>
          <Button variant='primary' onClick={toggleModal}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

PictureModal.propTypes = {
  modal: PropTypes.bool.isRequired,
  toggleModal: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  modal: state.journal.modal,
});

export default connect(mapStateToProps, { toggleModal })(PictureModal);
