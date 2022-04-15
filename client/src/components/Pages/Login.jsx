import React, { useState } from 'react';
import { login } from '../../actions/auth';
import '../../css/Login.scss';

import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

const Login = ({ login, user }) => {
  const [formInput, setFormInput] = useState({
    username: '',
    password: '',
  });
  const { username, password } = formInput;

  const onChange = (e) => {
    setFormInput({ ...formInput, [e.target.name]: e.target.value });
  };

  const onSubmit = () => {
    login(username, password);
  };

  if (user) {
    return <Redirect to='/home' />;
  }

  return (
    <div className='Login'>
      <h1>Login</h1>
      <input
        className='Login-Feild'
        autoComplete='off'
        type='text'
        name='username'
        value={username}
        onChange={(e) => onChange(e)}
        placeholder='Username'
      />
      <input
        className='Login-Feild'
        autoComplete='off'
        type='password'
        name='password'
        value={password}
        onChange={(e) => onChange(e)}
        placeholder='Password'
      />
      <div className='Login-Submit' onClick={() => onSubmit()}>
        Submit
      </div>
    </div>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, { login })(Login);
