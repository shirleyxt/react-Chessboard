import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Square from './Square';
import { ItemTypes } from './Constants';
import { DropTarget } from 'react-dnd';

const squareTarget = {
  drop(props, monitor) {
  props.movePiece(monitor.getItem().x, monitor.getItem().y, props.x, props.y);
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  };
}

class BoardSquare extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { x, y, connectDropTarget } = this.props;
    const blue = (x + y) % 2 === 1;

    return connectDropTarget(
      <div style={{
        width: '100%',
        height: '100%'
      }}>
        <Square blue={blue}>
          {this.props.children}
        </Square>
      </div>
    );
  }
}

BoardSquare.propTypes = {
  connectDropTarget: PropTypes.func.isRequired,
  movePiece: PropTypes.func.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired
};


export default DropTarget(ItemTypes.PIECE, squareTarget, collect)(BoardSquare);
