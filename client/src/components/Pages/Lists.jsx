import React, { useState } from 'react';
import '../../css/Lists.scss';
import { getLists, createList, deleteList } from '../../actions/lists';

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const NewListModal = ({ toggleModal, createList }) => {
  const [list, setList] = useState({ title: '' });

  const submitClicked = (e) => {
    e.stopPropagation();
    createList(list);
    toggleModal(false);
  };

  const inputChanged = (e) => {
    setList({ ...list, [e.target.name]: e.target.value });
  };

  return (
    <div className='Modal-Background' onClick={() => toggleModal(false)}>
      <div className='Modal' onClick={(e) => e.stopPropagation()}>
        <h2 className='Modal-Title'>Create New List</h2>
        <input
          className='Modal-Input'
          value={list.title}
          onChange={(e) => inputChanged(e)}
          name='title'
        />
        <div className='Lists-Btn Modal-Submit' onClick={(e) => submitClicked(e)}>
          Submit
        </div>
      </div>
    </div>
  );
};

const Lists = ({ getLists, createList, deleteList, lists }) => {
  const [modal, toggleModal] = useState(false);

  return (
    <div className='Lists'>
      {modal == true && <NewListModal toggleModal={toggleModal} createList={createList} />}
      <div className='Lists-TitleBox'>
        <Link className='Lists-Link' to='/home'>
          <div className='Lists-Btn Lists-BackBtn'>Back</div>
        </Link>
        <h1 className='Lists-Title'>Lists</h1>
      </div>
      <div className='Lists-Btn Lists-NewList' onClick={() => toggleModal(true)}>
        <FontAwesomeIcon className='Lists-NewList-Icon' icon={faPlus} />
        New List
      </div>
      <div className='Lists-Nav'>
        <div className='Lists-Btn Lists-NavBtn'>ff</div>
        <div className='Lists-Btn Lists-NavBtn'>ff</div>
        <div className='Lists-Btn Lists-NavBtn'>ff</div>
      </div>
      <div className='Lists-List'>
        <div className='Lists-List-Nav'>
          <div className='Lists-Btn Lists-List-AddItem'>Delete List</div>
          <h3 className='Lists-List-Title'>Title</h3>
          <div className='Lists-Btn Lists-List-AddItem'>Add Item</div>
        </div>
        <div className='Lists-List-Items'>
          <div className='Lists-List-Item'>
            <div className='Lists-List-Item-Label'>Sample Item</div>
            <div className='Lists-Btn Lists-List-Item-Btn'>Check</div>
            <div className='Lists-Btn Lists-List-Item-Btn'>Delete</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  lists: state.lists.lists,
});

export default connect(mapStateToProps, { getLists, createList, deleteList })(Lists);
