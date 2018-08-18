import { DragLayer } from 'react-dnd';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Piece from './Piece';
import {ItemTypes} from './Constants';

const layerStyles = {
  position: 'absolute',
  pointerEvents: 'none',
  zIndex: 100,
  left: 0,
  top: 0,
  width: '100%',
  height: '100%'
};

function snapToGrid(x: number, y: number) {
	const snappedX = Math.round(x / 32) * 32
	const snappedY = Math.round(y / 32) * 32
	return [snappedX, snappedY]
}

function getItemStyles(props) {
  const {initialOffset, currentOffset } = props;
  if (!currentOffset) {
    return {
      display: 'none'
    };
  }
  let { x, y } = currentOffset;
  // x -= initialOffset.x
  // y -= initialOffset.y
  // ;[x, y] = snapToGrid(x, y)
  // x += initialOffset.x
  // y += initialOffset.y


  const transform = `translate(${x}px, ${y}px)`;
  return {
    transform: transform,
    WebkitTransform: transform
  };
}

class PieceLayer extends Component {
  renderItem(type, item) {
    switch (type) {
    case ItemTypes.PIECE:
      return (
        <Piece piece={item.piece} width={item.width}/>
      );
    }
    return null;
  }
  render() {
    const { item, itemType, isDragging } = this.props;
    // if (!isDragging) {
    //   return null;
    // }

    return (
      <div style={layerStyles}>
        <div style={getItemStyles(this.props)}>
          {this.renderItem(itemType, item)}
        </div>
      </div>
    );
  }
}

PieceLayer.propTypes = {
  item: PropTypes.object,
  itemType: PropTypes.string,
  currentOffset: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired
  }),
  isDragging: PropTypes.bool.isRequired
};

function collect(monitor) {
  return {
    item: monitor.getItem(),
    itemType: monitor.getItemType(),
    initialOffset: monitor.getInitialSourceClientOffset(),
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging()
  };
}

export default DragLayer(collect)(PieceLayer);
