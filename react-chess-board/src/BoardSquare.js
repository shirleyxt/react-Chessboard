import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Square from './Square';
import { ItemTypes } from './Constants';
import { DropTarget } from 'react-dnd';

const squareTarget = {
  drop(props, monitor) {
    props.movePiece(monitor.getItem().x, monitor.getItem().y, props.x, props.y);
  },
  canDrop(props, monitor) {
    return props.canDrop(monitor.getItem().x, monitor.getItem().y, props.x, props.y);
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
  };
}

class BoardSquare extends Component {
  renderOverlay(color) {
    return (
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
        zIndex: 1,
        opacity: 0.5,
        backgroundColor: color,
      }} />
    );
  }
  render() {
    const { x, y, connectDropTarget, canDrop, isOver} = this.props;
    const blue = (x + y) % 2 === 1;
    //{!isOver && canDrop && this.renderOverlay('black')}

    return connectDropTarget(
      <div style={{
        position: 'relative',
        width: '100%',
        height: '100%'
      }}>
        <Square blue={blue}>
          {this.props.children}
        </Square>
        { canDrop && this.renderOverlay('black')}
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
