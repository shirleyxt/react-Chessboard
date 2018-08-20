import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Square from './Square';
import { ItemTypes } from './Constants';
import { DropTarget } from 'react-dnd';

const labelStyles = {fontSize: 'calc(7px + .5vw)', position: 'absolute', userSelect: 'none'}
const yLabelStyles = Object.assign({top: '5%', left: '5%'}, labelStyles)
const xLabelStyles = Object.assign({bottom: '5%', right: '5%'}, labelStyles)

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
  renderLabelText(x, y) {
    const isLeftColumn = y === 0;
    const isBottomRow = x === 7;
    const bottomLabel = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

    if (!isLeftColumn && !isBottomRow) {
      return null;
    }

    if (isLeftColumn && isBottomRow) {
      return [
        <span key='blx' style={xLabelStyles}>
          a
        </span>,
        <span key='bly' style={yLabelStyles}>
          1
        </span>
      ]
    }

    const label = isLeftColumn ? 8 - x : bottomLabel[y];
    return <span style={isLeftColumn ? yLabelStyles : xLabelStyles}>{label}</span>
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
        {this.renderLabelText(x, y)}
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
