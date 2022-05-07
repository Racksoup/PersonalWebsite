import React from 'react';
import '../css/Utils.scss';

import { Link } from 'react-router-dom';

const TitleBox = (props) => {
  return (
    <div className='TitleBox1'>
      <Link className='Link' to='/home'>
        <div className='Btn'>Home</div>
      </Link>
      <Link className='Link' to='/weather'>
        <div className='Btn'>Weather</div>
      </Link>
      <div className='Title' style={{ width: '7rem' }}>
        {props.name}
      </div>
      <div style={{ width: '5rem' }} />
      <Link className='Link' to='/lists'>
        <div className='Btn'>Lists</div>
      </Link>
    </div>
  );
};

export default TitleBox;
