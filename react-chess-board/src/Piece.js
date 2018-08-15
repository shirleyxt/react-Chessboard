import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ItemTypes } from './Constants';
import { DragSource } from 'react-dnd';

class Piece extends Component {
  render() {
    const { connectDragSource, isDragging, piece} = this.props;
      let picName = "";
      if (piece === piece.toUpperCase()) {
        picName = 'w' + piece.toUpperCase();
      } else {
        picName = 'b' + piece.toUpperCase();
      }
      const path = `img/chesspieces/alpha/${picName}.png`;
    return connectDragSource(
      <div style={{height: '100%', width: '100%',
      opacity: isDragging ? 0 : 1}}>
        <img src={path} style={{
          height: '85%',
          width: '85%',
          opacity: isDragging ? 0 : 1,
          cursor: 'move',
          backgroundColor: 'transparent'
        }}
        alt=''
        />
       </div>
    );
  }
}

const pieceSource = {
  beginDrag(props) {
    return {x:props.x, y:props.y};
  },
  canDrag(props){
    return props.canDrag(props.piece);
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

Piece.propTypes = {
  connectDragSource: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired,
  piece: PropTypes.string.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired
};

export default DragSource(ItemTypes.PIECE, pieceSource, collect)(Piece);
