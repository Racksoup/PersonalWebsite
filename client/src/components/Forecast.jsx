import React, { Fragment, useEffect } from 'react';
import { getFourDay } from '../actions/forecast';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';

const Forecast = ({ getFourDay, forecast }) => {
  useEffect(() => {
    getFourDay();
  }, []);
  console.log(forecast);
  return <Fragment></Fragment>;
};

Forecast.propTypes = {
  getFourDay: PropTypes.func.isRequired,
  forecast: PropTypes.object,
};

const mapStateToProps = (state) => ({
  forecast: state.forecast.forecast,
});

export default connect(mapStateToProps, { getFourDay })(Forecast);
