import React, { useState, useEffect } from 'react';
import '../../css/Lists.scss';
import { getLists, createList, deleteList } from '../../actions/lists';
import { getList, createListItem, deleteListItem, updateListItem } from '../../actions/listItem';
import NewListModal from '../NewListModal';

import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlus,
  faX,
  faCheck,
  faMinus,
  faStar,
  faAngleRight,
  faAsterisk,
  faSquare,
  faCircle,
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
                if (item.parentId === item.listId && !item.checked) {
                  const labelStyle = {};

                  if (item.checked) {
                    labelStyle.textDecorationLine = 'line-through';
                    labelStyle.textDecorationThickness = '4px';
                    labelStyle.textDecorationColor = 'rgba(0, 0, 0, 1)';
                  }
                  return (
                    <>
                      <div className='Item' onClick={() => clickedItem(item)}>
                        <div className='Label' style={labelStyle}>
                          {item.title}
                        </div>
                        <div className='Item-Btns'>
                          <div
                            className='Btn Btn-Add'
                            onClick={() => toggleNewNestedItemModal(true)}
                          >
                            <FontAwesomeIcon icon={faPlus} />
                          </div>
                          <div className='Btn' onClick={() => updateClicked(item)}>
                            <FontAwesomeIcon icon={faCheck} />
                          </div>
                          <div className='Btn Btn-Delete' onClick={() => deleteListItem(item._id)}>
                            <FontAwesomeIcon icon={faX} />
                          </div>
                        </div>
                      </div>
                      {list.map((item2) => {
                        if (item2.parentId == item._id && !item2.checked)
                          return (
                            <NestedLists
                              item2={item2}
                              list={list}
                              clickedItem={clickedItem}
                              toggleNewNestedItemModal={toggleNewNestedItemModal}
                              updateClicked={updateClicked}
                              deleteListItem={deleteListItem}
                              depth={1}
                            />
                          );
                      })}
                      {list.map((item2) => {
                        if (item2.parentId == item._id && item2.checked)
                          return (
                            <NestedLists
                              item2={item2}
                              list={list}
                              clickedItem={clickedItem}
                              toggleNewNestedItemModal={toggleNewNestedItemModal}
                              updateClicked={updateClicked}
                              deleteListItem={deleteListItem}
                              depth={1}
                            />
                          );
                      })}
                    </>
                  );
                }
              })}
              {list.map((item) => {
                if (item.parentId === item.listId && item.checked) {
                  const labelStyle = {};

                  if (item.checked) {
                    labelStyle.textDecorationLine = 'line-through';
                    labelStyle.textDecorationThickness = '4px';
                    labelStyle.textDecorationColor = 'rgba(0, 0, 0, 1)';
                  }
                  return (
                    <>
                      <div className='Item' onClick={() => clickedItem(item)}>
                        <div className='Label' style={labelStyle}>
                          {item.title}
                        </div>
                        <div className='Item-Btns'>
                          <div
                            className='Btn Btn-Add'
                            onClick={() => toggleNewNestedItemModal(true)}
                          >
                            <FontAwesomeIcon icon={faPlus} />
                          </div>
                          <div className='Btn' onClick={() => updateClicked(item)}>
                            <FontAwesomeIcon icon={faCheck} />
                          </div>
                          <div className='Btn Btn-Delete' onClick={() => deleteListItem(item._id)}>
                            <FontAwesomeIcon icon={faX} />
                          </div>
                        </div>
                      </div>
                      {list.map((item2) => {
                        if (item2.parentId == item._id && !item2.checked)
                          return (
                            <NestedLists
                              item2={item2}
                              list={list}
                              clickedItem={clickedItem}
                              toggleNewNestedItemModal={toggleNewNestedItemModal}
                              updateClicked={updateClicked}
                              deleteListItem={deleteListItem}
                              depth={1}
                            />
                          );
                      })}
                      {list.map((item2) => {
                        if (item2.parentId == item._id && item2.checked)
                          return (
                            <NestedLists
                              item2={item2}
                              list={list}
                              clickedItem={clickedItem}
                              toggleNewNestedItemModal={toggleNewNestedItemModal}
                              updateClicked={updateClicked}
                              deleteListItem={deleteListItem}
                              depth={1}
                            />
                          );
                      })}
                    </>
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

const NestedLists = ({
  item2,
  list,
  clickedItem,
  toggleNewNestedItemModal,
  updateClicked,
  deleteListItem,
  depth,
}) => {
  const nextDepth = depth + 1;

  const labelStyle = {
    marginLeft: (depth - 1) * 10,
  };

  if (item2.checked) {
    labelStyle.textDecorationLine = 'line-through';
    labelStyle.textDecorationThickness = '4px';
    labelStyle.textDecorationColor = 'rgba(0, 0, 0, 1)';
  }

  const Indent = () => {
    let shapes = [faAngleRight, faMinus, faPlus, faAsterisk, faStar, faSquare, faCircle];
    let shapesInd = (depth - 1) % 7;
    let myString = shapes[shapesInd];
    return (
      <div className='Indents'>
        <FontAwesomeIcon icon={myString} className='Icon' />
      </div>
    );
  };

  return (
    <>
      <div className='Item' onClick={() => clickedItem(item2)}>
        <div className='Label' style={labelStyle}>
          <Indent />
          {item2.title}
        </div>
        <div className='Item-Btns'>
          <div className='Btn Btn-Add' onClick={() => toggleNewNestedItemModal(true)}>
            <FontAwesomeIcon icon={faPlus} />
          </div>
          <div className='Btn' onClick={() => updateClicked(item2)}>
            <FontAwesomeIcon icon={faCheck} />
          </div>
          <div className='Btn Btn-Delete' onClick={() => deleteListItem(item2._id)}>
            <FontAwesomeIcon icon={faX} />
          </div>
        </div>
      </div>
      {list.map((itemx) => {
        if (itemx.parentId == item2._id && !itemx.checked)
          return (
            <NestedLists
              item2={itemx}
              list={list}
              clickedItem={clickedItem}
              toggleNewNestedItemModal={toggleNewNestedItemModal}
              updateClicked={updateClicked}
              deleteListItem={deleteListItem}
              depth={nextDepth}
            />
          );
      })}
      {list.map((itemx) => {
        if (itemx.parentId == item2._id && itemx.checked)
          return (
            <NestedLists
              item2={itemx}
              list={list}
              clickedItem={clickedItem}
              toggleNewNestedItemModal={toggleNewNestedItemModal}
              updateClicked={updateClicked}
              deleteListItem={deleteListItem}
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
