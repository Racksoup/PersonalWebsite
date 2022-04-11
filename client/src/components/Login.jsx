import React, { useState } from 'react';
import { login } from '../actions/auth';

import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const Login = ({ login, user }) => {
  const [formInput, setFormInput] = useState({
    username: '',
    password: '',
  });
  const { username, password } = formInput;

  const onChange = (e) => {
    setFormInput({ ...formInput, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    login(username, password);
  };

  if (user) {
    return <Redirect to='/home' />;
  }

  return (
    <Container style={{ maxWidth: '400px' }} className='mt-5'>
      <h1>Login</h1>
      <Form onSubmit={(e) => onSubmit(e)}>
        <Form.Group className='mb-3'>
          <Form.Label>Username</Form.Label>
          <Form.Control
            autoComplete='off'
            type='text'
            name='username'
            value={username}
            onChange={(e) => onChange(e)}
            placeholder='Username'
          />
        </Form.Group>
        <Form.Group className='mb-2'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            autoComplete='off'
            type='password'
            name='password'
            value={password}
            onChange={(e) => onChange(e)}
            placeholder='Password'
          />
        </Form.Group>
        <Button variant='primary' type='submit'>
          Submit
        </Button>
      </Form>
    </Container>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, { login })(Login);
