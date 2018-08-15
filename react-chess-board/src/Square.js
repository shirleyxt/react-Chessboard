import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Square extends Component {
  render() {
    const { blue } = this.props;
    const fill = blue ? 'lightblue' : 'white';

    return (
      <div style={{
        backgroundColor: fill,
        width: '100%',
        height: '100%'
      }}>
        {this.props.children}
      </div>
    );
  }
}

Square.propTypes = {
  blue: PropTypes.bool.isRequired
};
