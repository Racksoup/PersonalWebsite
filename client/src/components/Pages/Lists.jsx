import React, { useState, useEffect } from 'react';
import '../../css/Lists.scss';
import { getLists, createList, deleteList } from '../../actions/lists';
import { getList, createListItem, deleteListItem, updateListItem } from '../../actions/listItem';
import Modal from '../Modal';
import DeleteModal from '../DeleteModal';

import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlus,
  faX,
  faMinus,
  faStar,
  faAngleRight,
  faAsterisk,
  faSquare,
  faCircle,
  faArrowUp,
} from '@fortawesome/free-solid-svg-icons';
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
  const [updateItemModal, toggleUpdateItemModal] = useState(false);
  const [deleteItemModal, toggleDeleteItemModal] = useState(false);
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
    checkClicked(item);
  };

  const checkClicked = (item) => {
    const newItem = item;
    newItem.checked = !newItem.checked;
    updateListItem(newItem);
  };

  const deleteListClicked = () => {
    deleteList(lastListClicked);
    setLastListClicked('');
  };

  const addItemClicked = (e, item) => {
    e.stopPropagation();
    setLastItemClicked(item);
    toggleNewNestedItemModal(true);
  };

  const updateItemClicked = (e, item) => {
    e.stopPropagation();
    setLastItemClicked(item);
    toggleUpdateItemModal(true);
  };

  const itemDeleteClicked = (e, item) => {
    e.stopPropagation();
    let hasChildren = false;
    list.map((listItem) => {
      if (item._id === listItem.parentId) {
        hasChildren = true;
      }
    });
    if (!hasChildren) {
      deleteListItem(item._id);
    } else {
      toggleDeleteItemModal(true);
    }
  };

  if (!isAuthenticated && !loading) {
    return <Redirect to='/' />;
  }

  return (
    <div className='Section'>
      <div className='Lists'>
        {modal == true && (
          <Modal
            toggleModal={toggleModal}
            createListFunc={createList}
            initState={newListInitState}
            title='Create New List'
            resize={false}
          />
        )}
        {newItemModal == true && (
          <Modal
            toggleModal={toggleNewItemModal}
            createListFunc={createListItem}
            initState={newItemInitState}
            title='Create New Item'
            resize={true}
          />
        )}
        {newNestedItemModal == true && (
          <Modal
            toggleModal={toggleNewNestedItemModal}
            createListFunc={createListItem}
            initState={newNestedItemInitState}
            title='Create New Item'
            resize={true}
          />
        )}
        {updateItemModal == true && (
          <Modal
            toggleModal={toggleUpdateItemModal}
            createListFunc={updateListItem}
            initState={lastItemClicked}
            title='Update Item'
            resize={true}
          />
        )}
        {deleteItemModal == true && (
          <DeleteModal
            toggleModal={toggleDeleteItemModal}
            delFunc={deleteListItem}
            state={lastItemClicked}
          />
        )}

        <TitleBox name='Lists' />
        <div className='Btn NewListBtn' onClick={() => toggleModal(true)}>
          <FontAwesomeIcon className='Icon' icon={faPlus} />
          New List
        </div>
        <div className='Nav'>
          {lists.map((list) => (
            <div className='Btn-1' onClick={() => clickedList(list)}>
              {list.title}
            </div>
          ))}
        </div>
        {lastListClicked && (
          <div className='List'>
            <div className='ListNav'>
              <div className='Btn Btn-Delete' onClick={() => deleteListClicked()}>
                <FontAwesomeIcon icon={faX} className='Icon' />
              </div>
              <h3 className='Title'>{lastListClicked.title}</h3>
              <div className='Btns'>
                <div className='Btn Btn-Add' onClick={() => toggleNewItemModal(true)}>
                  <FontAwesomeIcon icon={faPlus} className='Icon' />
                </div>
                <div className='Btn'>
                  <FontAwesomeIcon icon={faArrowUp} />
                </div>
              </div>
            </div>
            <div className='Items'>
              {list.map((item) => {
                if (item.parentId === item.listId && !item.checked) {
                  return (
                    <ItemChain
                      item={item}
                      list={list}
                      clickedItem={clickedItem}
                      toggleNewNestedItemModal={toggleNewNestedItemModal}
                      checkClicked={checkClicked}
                      deleteListItem={deleteListItem}
                      depth={0}
                      addItemClicked={addItemClicked}
                      updateItemClicked={updateItemClicked}
                      itemDeleteClicked={itemDeleteClicked}
                    />
                  );
                }
              })}
              {list.map((item) => {
                if (item.parentId === item.listId && item.checked) {
                  return (
                    <ItemChain
                      item={item}
                      list={list}
                      clickedItem={clickedItem}
                      toggleNewNestedItemModal={toggleNewNestedItemModal}
                      checkClicked={checkClicked}
                      deleteListItem={deleteListItem}
                      depth={0}
                      addItemClicked={addItemClicked}
                      updateItemClicked={updateItemClicked}
                      itemDeleteClicked={itemDeleteClicked}
                    />
                  );
                }
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const ItemChain = ({
  item,
  list,
  clickedItem,
  toggleNewNestedItemModal,
  checkClicked,
  deleteListItem,
  depth,
  addItemClicked,
  updateItemClicked,
  itemDeleteClicked,
}) => {
  const nextDepth = depth + 1;

  const labelStyle = {
    marginLeft: depth * 14,
  };

  if (depth <= 0) {
    labelStyle.marginLeft = '0';
  }

  if (item.checked) {
    labelStyle.textDecorationLine = 'line-through';
    labelStyle.textDecorationThickness = '4px';
    labelStyle.textDecorationColor = 'rgba(0, 0, 0, 1)';
  }

  const Indent = () => {
    let shapes = [faCircle, faAngleRight, faMinus, faPlus, faAsterisk, faStar, faSquare];
    let shapesInd = depth % 7;
    let myString = shapes[shapesInd];
    return (
      <div className='Indents'>
        <FontAwesomeIcon icon={myString} className='Icon' />
      </div>
    );
  };

  return (
    <>
      <div className='Item' onClick={() => clickedItem(item)}>
        <div className='Label' style={labelStyle}>
          <Indent />
          {item.title}
        </div>
        <div className='Item-Btns'>
          <div className='Btn Btn-Add' onClick={(e) => addItemClicked(e, item)}>
            <FontAwesomeIcon icon={faPlus} />
          </div>
          <div className='Btn' onClick={(e) => updateItemClicked(e, item)}>
            <FontAwesomeIcon icon={faArrowUp} />
          </div>
          <div className='Btn Btn-Delete' onClick={(e) => itemDeleteClicked(e, item)}>
            <FontAwesomeIcon icon={faX} />
          </div>
        </div>
      </div>
      {list.map((newItem) => {
        if (newItem.parentId == item._id && !newItem.checked)
          return (
            <ItemChain
              item={newItem}
              list={list}
              clickedItem={clickedItem}
              toggleNewNestedItemModal={toggleNewNestedItemModal}
              checkClicked={checkClicked}
              deleteListItem={deleteListItem}
              depth={nextDepth}
              addItemClicked={addItemClicked}
              updateItemClicked={updateItemClicked}
              itemDeleteClicked={itemDeleteClicked}
            />
          );
      })}
      {list.map((newItem) => {
        if (newItem.parentId == item._id && newItem.checked)
          return (
            <ItemChain
              item={newItem}
              list={list}
              clickedItem={clickedItem}
              toggleNewNestedItemModal={toggleNewNestedItemModal}
              checkClicked={checkClicked}
              deleteListItem={deleteListItem}
              depth={nextDepth}
              addItemClicked={addItemClicked}
              updateItemClicked={updateItemClicked}
              itemDeleteClicked={itemDeleteClicked}
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
