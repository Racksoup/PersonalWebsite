import React, { useState, useEffect } from 'react';
import '../../css/Lists.scss';
import { getLists, createList, deleteList } from '../../actions/lists';
import { getList, createListItem, deleteListItem, updateListItem } from '../../actions/listItem';
import NewListModal from '../NewListModal';

import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Redirect } from 'react-router-dom';
import TitleBox from '../TitleBox';

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
  isAuthenticated,
  loading,
}) => {
  useEffect(() => {
    getLists();
  }, []);

  const [modal, toggleModal] = useState(false);
  const [newItemModal, toggleNewItemModal] = useState(false);
  const [newNestedItemModal, toggleNewNestedItemModal] = useState(false);
  const [lastListClicked, setLastListClicked] = useState('');
  const [lastItemClicked, setLastItemClicked] = useState('');
  const newListInitState = { title: '' };
  const newItemInitState = {
    listId: lastListClicked._id,
    parentId: lastListClicked._id,
    title: '',
    checked: false,
  };
  const newNestedItemInitState = {
    listId: lastItemClicked.listId,
    parentId: lastItemClicked._id,
    title: '',
    checked: false,
  };

  const clickedList = (list) => {
    getList(list._id);
    setLastListClicked(list);
  };

  const clickedItem = (item) => {
    setLastItemClicked(item);
  };

  const updateClicked = (item) => {
    const newItem = item;
    newItem.checked = !newItem.checked;
    updateListItem(newItem);
  };

  const deleteListClicked = () => {
    deleteList(lastListClicked);
    setLastListClicked('');
  };

  if (!isAuthenticated && !loading) {
    return <Redirect to='/' />;
  }

  return (
    <div className='Section'>
      <div className='Lists'>
        {modal == true && (
          <NewListModal
            toggleModal={toggleModal}
            createListFunc={createList}
            initState={newListInitState}
          />
        )}
        {newItemModal == true && (
          <NewListModal
            toggleModal={toggleNewItemModal}
            createListFunc={createListItem}
            initState={newItemInitState}
          />
        )}
        {newNestedItemModal == true && (
          <NewListModal
            toggleModal={toggleNewNestedItemModal}
            createListFunc={createListItem}
            initState={newNestedItemInitState}
          />
        )}
        <TitleBox name='Lists' />
        <div className='Nav'>
          {lists.map((list) => (
            <div className='Btn' onClick={() => clickedList(list)}>
              {list.title}
            </div>
          ))}
        </div>
        <div className='Btn NewListBtn' onClick={() => toggleModal(true)}>
          <FontAwesomeIcon className='Icon' icon={faPlus} />
          New List
        </div>
        {lastListClicked && (
          <div className='List'>
            <div className='ListNav'>
              <div className='Btn' onClick={() => deleteListClicked()}>
                Delete List
              </div>
              <h3 className='Title'>{lastListClicked.title}</h3>
              <div className='Btn' onClick={() => toggleNewItemModal(true)}>
                Add Item
              </div>
            </div>
            <div className='Items'>
              {list.map((item) => {
                if (item.parentId === item.listId)
                  return (
                    <>
                      <div className='Item' onClick={() => clickedItem(item)}>
                        <div className='Label'>{item.title}</div>
                        <div className='Btn' onClick={() => toggleNewNestedItemModal(true)}>
                          Add
                        </div>
                        <div className='Btn' onClick={() => updateClicked(item)}>
                          Check
                        </div>
                        <div className='Btn' onClick={() => deleteListItem(item._id)}>
                          Delete
                        </div>
                        {item.checked && <div className='Checked' />}
                      </div>
                      {list.map((item2) => {
                        if (item2.parentId == item._id)
                          return (
                            <NestedLists
                              item2={item2}
                              list={list}
                              clickedItem={clickedItem}
                              toggleNewNestedItemModal={toggleNewNestedItemModal}
                              updateClicked={updateClicked}
                              depth={1}
                            />
                          );
                      })}
                    </>
                  );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const NestedLists = ({
  item2,
  list,
  clickedItem,
  toggleNewNestedItemModal,
  updateClicked,
  depth,
}) => {
  const nextDepth = depth + 1;

  const labelStyle = {
    marginLeft: depth * 15,
  };

  return (
    <>
      <div className='Item' onClick={() => clickedItem(item2)}>
        <div className='Label' style={labelStyle}>
          {item2.title}
        </div>
        <div className='Btn' onClick={() => toggleNewNestedItemModal(true)}>
          Add
        </div>
        <div className='Btn' onClick={() => updateClicked(item2)}>
          Check
        </div>
        <div className='Btn' onClick={() => deleteListItem(item2._id)}>
          Delete
        </div>
        {item2.checked && <div className='Checked' />}
      </div>
      {list.map((itemx) => {
        if (itemx.parentId == item2._id)
          return (
            <NestedLists
              item2={itemx}
              list={list}
              clickedItem={clickedItem}
              toggleNewNestedItemModal={toggleNewNestedItemModal}
              updateClicked={updateClicked}
              depth={nextDepth}
            />
          );
      })}
    </>
  );
};

const mapStateToProps = (state) => ({
  lists: state.lists.lists,
  list: state.listItem.list,
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading,
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
