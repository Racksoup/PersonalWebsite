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
  const [lastListClicked, setLastListClicked] = useState('');
  const newListInitState = { title: '' };
  const newItemInitState = {
    listTitle: lastListClicked.title,
    title: '',
    checked: false,
  };

  const clickedList = (list) => {
    getList(list.title);
    setLastListClicked(list);
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
        <TitleBox name='Lists' />
        <div className='Nav'>
          {lists.map((list) => (
            <div className='Btn' onClick={() => clickedList(list)}>
              {list.title}
            </div>
          ))}
        </div>
        <div className='Btn NewListBtn' onClick={() => toggleModal(true)}>
          <FontAwesomeIcon className='NewListIcon' icon={faPlus} />
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
              {list.map((item) => (
                <div className='Item'>
                  <div className='Label'>{item.title}</div>
                  <div className='Btn' onClick={() => updateClicked(item)}>
                    Check
                  </div>
                  <div className='Btn' onClick={() => deleteListItem(item._id)}>
                    Delete
                  </div>
                  {item.checked && <div className='Checked' />}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
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
