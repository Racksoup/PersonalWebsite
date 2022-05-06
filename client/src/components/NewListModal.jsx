import React, { useState } from 'react';
import '../css/Modal.scss';

const NewListModal = ({ toggleModal, createListFunc, initState }) => {
  const [list, setList] = useState(initState);

  const submitClicked = (e) => {
    e.stopPropagation();
    createListFunc(list);
    toggleModal(false);
  };

  const inputChanged = (e) => {
    setList({ ...list, [e.target.name]: e.target.value });
  };

  return (
    <div className='Modal-Background' onClick={() => toggleModal(false)}>
      <div className='Modal' onClick={(e) => e.stopPropagation()}>
        <h2 className='Title'>Create New List</h2>
        <input
          className='Input'
          value={list.title}
          onChange={(e) => inputChanged(e)}
          name='title'
        />
        <div className='Btn' onClick={(e) => submitClicked(e)}>
          Submit
        </div>
      </div>
    </div>
  );
};

export default NewListModal;
