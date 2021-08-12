import React, { Fragment, useState, useEffect } from 'react';
import { getOneCallWeather } from '../../actions/weather';

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

const Daily = ({ daily, getOneCallWeather }) => {
  useEffect(() => {
    getOneCallWeather();
  }, []);

  if (daily) {
    return (
      <Fragment>
        <div style={{ display: 'flex', overflow: 'hidden' }}>
          <div style={{ width: '0px' }}>
            <Button>
              <Link style={{ color: 'white' }} to='/weather'>
                Back
              </Link>
            </Button>
          </div>
          <h1 style={{ margin: 'auto' }}>Daily</h1>
        </div>
        <Table striped bordered hover style={{ width: '80%', margin: 'auto', marginTop: '20px' }}>
          <thead>
            <tr style={{ color: 'white' }}>
              <th>Day</th>
            </tr>
          </thead>
          <tbody>
            {daily.map((day) => {
              return <tr style={{ color: 'white' }}></tr>;
            })}
          </tbody>
        </Table>
      </Fragment>
    );
  } else return null;
};

Daily.propTypes = {
  daily: PropTypes.array,
  getOneCallWeather: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  daily: state.weather.daily,
});

export default connect(mapStateToProps, { getOneCallWeather })(Daily);
