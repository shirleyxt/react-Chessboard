import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Piece extends Component {
  render() {
    const {piece} = this.props;
      let picName = "";
      if (piece === piece.toUpperCase()) {
        picName = 'w' + piece.toUpperCase();
      } else {
        picName = 'b' + piece.toUpperCase();
      }
      const path = `img/chesspieces/alpha/${picName}.png`;
      //
      //opacity: isDragging ? 0 : 1,
      //cursor: canDrag ? 'move': null,
    return (
        <img src={path} style={{
          height: '85%',
          width: '85%',
          backgroundColor: 'transparent'
        }}
        alt=''
        />
    );
  }
}

Piece.propTypes = {
  piece: PropTypes.string.isRequired,
};
