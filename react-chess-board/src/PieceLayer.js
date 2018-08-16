import { DragLayer } from 'react-dnd';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Piece} from './Piece';

class PieceLayer extends Component {
  render() {
    if (!this.props.isDragging) {
      return null;
    }
    return (<Piece piece={this.props.piece}/>)
  }
}

PieceLayer.propTypes = {
  piece: PropTypes.string.isRequired,
  isDragging: PropTypes.bool.isRequired
};

function collect(monitor) {
  return {
    piece: monitor.getItem().piece,
    isDragging: monitor.isDragging()
  };
}

export default PieceLayer(collect)(PieceLayer);
