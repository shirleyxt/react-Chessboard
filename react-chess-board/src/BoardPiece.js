import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ItemTypes } from './Constants';
import { DragSource } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';

import Piece from './Piece';

class BoardPiece extends Component {
  componentDidMount() {
		const { connectDragPreview } = this.props
    // const {piece} = this.props;
    //   let picName = "";
    //   if (piece === piece.toUpperCase()) {
    //     picName = 'w' + piece.toUpperCase();
    //   } else {
    //     picName = 'b' + piece.toUpperCase();
    //   }
    //   const path = `img/chesspieces/alpha/${picName}.png`;
    //   const img = new Image();
    //   img.src = path;
    //   img.onload = () => this.props.connectDragPreview(img);


			// Use empty image as a drag preview so browsers don't draw it
			// and we can draw whatever we want on the custom drag layer instead.
			connectDragPreview(getEmptyImage(), {
				// IE fallback: specify that we'd rather screenshot the node
				// when it already knows it's being dragged so we can hide it with CSS.
				captureDraggingState: true,
			});
	}
  render() {
    const { connectDragSource, isDragging, canDrag, piece} = this.props;
    return connectDragSource(
      <div style={{height: '100%',
                   width: '100%',
                   opacity: isDragging ? 0 : 1,
                   cursor: canDrag ? 'move': null,
                 }}>
        <Piece piece={piece} width={this.props.width}/>
       </div>
    );
  }
}

const pieceSource = {
  beginDrag(props) {
    return {x:props.x, y:props.y, piece: props.piece, width: props.width};
  },
  canDrag(props){
    return props.canDrag(props.piece);
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging(),
    canDrag: monitor.canDrag(),
  }
}

BoardPiece.propTypes = {
  connectDragSource: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired,
  piece: PropTypes.string.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired
};

export default DragSource(ItemTypes.PIECE, pieceSource, collect)(BoardPiece);
