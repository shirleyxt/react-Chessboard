import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import PropTypes from 'prop-types';
import PieceLayer from './PieceLayer';
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
                    canDrag={this.props.canDrag}
                    width={this.props.width * 0.125 * 0.85}/>;
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
          width: this.props.width.toString() + 'px',
          height: this.props.width.toString() + 'px',
          display: 'flex',
          flexWrap: 'wrap',
          position: 'relative',
        }}>
          {squares}
          <PieceLayer />
        </div>
    );
  }
}

Board.propTypes = {
  movePiece: PropTypes.func.isRequired,
  boardState: PropTypes.array.isRequired,
  width: PropTypes.number.isRequired,
};

export default DragDropContext(HTML5Backend)(Board);
