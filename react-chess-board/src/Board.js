import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import PropTypes from 'prop-types';

import BoardPiece from './BoardPiece';
import BoardSquare from './BoardSquare';

class Board extends Component {
  constructor(props) {
    super(props);
  }
  renderPiece(x, y, char) {
    return char === " " ?
      null : <BoardPiece piece={char}
                    x={x}
                    y={y}
                    canDrag={this.props.canDrag}/>;
  }

  renderSquare(i) {
    const y = i % 8;
    const x = Math.floor(i / 8);
    const isBlue = (x + y) % 2 === 1;

    return (
      <div key={i}
           style={{ width: '12.5%', height: '12.5%'}}>
        <BoardSquare x={x}
                     y = {y}
                     movePiece={this.props.movePiece}
                     canDrop={this.props.canDrop}>
          {this.renderPiece(x, y, this.props.boardState[i])}
        </BoardSquare>
      </div>
    );
  }

  render() {
    const squares = [];
    for (let i = 0; i < 64; i++) {
      squares.push(this.renderSquare(i));
    }

    return (
      <div style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexWrap: 'wrap'
      }}>
        {squares}
      </div>
    );
  }
}

Board.propTypes = {
  movePiece: PropTypes.func.isRequired,
  boardState: PropTypes.array.isRequired
};

export default DragDropContext(HTML5Backend)(Board);
