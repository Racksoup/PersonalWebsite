import React from 'react';
import '../../css/Lists.scss';

import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const Lists = () => {
  return (
    <div className='Lists'>
      <div className='Lists-TitleBox'>
        <Link className='Lists-Link' to='/home'>
          <div className='Lists-Btn Lists-BackBtn'>Back</div>
        </Link>
        <h1 className='Lists-Title'>Lists</h1>
      </div>
      <div className='Lists-Btn Lists-NewList'>
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
          <div />
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

export default Lists;
