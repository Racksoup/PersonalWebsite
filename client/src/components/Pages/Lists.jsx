import React, { useState, useEffect } from 'react';
import '../../css/Lists.scss';
import { getLists, createList, deleteList } from '../../actions/lists';
import { getList, createListItem, deleteListItem, updateListItem } from '../../actions/listItem';

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

const NewItemModal = ({ toggleNewItemModal, createListItem, lastListClicked }) => {
  const [newListItem, setNewListItem] = useState({
    listTitle: lastListClicked.title,
    title: '',
    checked: false,
  });

  const submitClicked = (e) => {
    e.stopPropagation();
    createListItem(newListItem);
    toggleNewItemModal(false);
  };

  const inputChanged = (e) => {
    setNewListItem({ ...newListItem, [e.target.name]: e.target.value });
  };

  return (
    <div className='Modal-Background' onClick={() => toggleNewItemModal(false)}>
      <div className='Modal' onClick={(e) => e.stopPropagation()}>
        <h2 className='Modal-Title'>Add Item</h2>
        <input
          className='Modal-Input'
          value={newListItem.title}
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

const Lists = ({
  getLists,
  createList,
  deleteList,
  getList,
  createListItem,
  deleteListItem,
  updateListItem,
  list,
  lists,
}) => {
  useEffect(() => {
    getLists();
  }, []);

  const [modal, toggleModal] = useState(false);
  const [newItemModal, toggleNewItemModal] = useState(false);
  const [lastListClicked, setLastListClicked] = useState({});

  const clickedList = (list) => {
    getList(list.title);
    setLastListClicked(list);
  };

  const updateClicked = (item) => {
    const newItem = item;
    newItem.checked = !newItem.checked;
    updateListItem(newItem);
  };

  return (
    <div className='Lists'>
      {modal == true && <NewListModal toggleModal={toggleModal} createList={createList} />}
      {newItemModal == true && (
        <NewItemModal
          toggleNewItemModal={toggleNewItemModal}
          createListItem={createListItem}
          lastListClicked={lastListClicked}
        />
      )}
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
        {lists.map((list) => (
          <div className='Lists-Btn Lists-NavBtn' onClick={() => clickedList(list)}>
            {list.title}
          </div>
        ))}
      </div>
      <div className='Lists-List'>
        <div className='Lists-List-Nav'>
          <div className='Lists-Btn Lists-List-AddItem' onClick={() => deleteList(lastListClicked)}>
            Delete List
          </div>
          <h3 className='Lists-List-Title'>{lastListClicked.title}</h3>
          <div className='Lists-Btn Lists-List-AddItem' onClick={() => toggleNewItemModal(true)}>
            Add Item
          </div>
        </div>
        <div className='Lists-List-Items'>
          {list.map((item) => (
            <div className='Lists-List-Item'>
              <div className='Lists-List-Item-Label'>{item.title}</div>
              <div className='Lists-Btn Lists-List-Item-Btn' onClick={() => updateClicked(item)}>
                Check
              </div>
              <div
                className='Lists-Btn Lists-List-Item-Btn'
                onClick={() => deleteListItem(item._id)}
              >
                Delete
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  lists: state.lists.lists,
  list: state.listItem.list,
});

export default connect(mapStateToProps, {
  getLists,
  createList,
  deleteList,
  getList,
  createListItem,
  deleteListItem,
  updateListItem,
})(Lists);
