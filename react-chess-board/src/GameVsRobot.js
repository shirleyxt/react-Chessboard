import React, { Component } from 'react';
import Board from './Board';
import Chess from 'chess.js';
import {boardToFEN, FENToBoard, coorToPos} from './Constants';
import PropTypes from 'prop-types';
import {findBestMove} from './ChessAI.js';

export default class GameVsRobot extends Component {
  constructor(props) {
    super(props);
    this.chess = new Chess();
    this.chess.reset();
    this.state = {boardState: FENToBoard(this.chess.fen())};
    this.movePiece = this.movePiece.bind(this);
    this.canDrag = this.canDrag.bind(this);
    this.canDrop = this.canDrop.bind(this);
    this.robotMove = this.robotMove.bind(this);
  }
  robotMove() {
    const bestMove = findBestMove(3, this.chess, this.chess.turn());
    this.chess.move(bestMove);
    this.setState({boardState: FENToBoard(this.chess.fen())});
  }
  movePiece(frX, frY, toX, toY) {
    this.chess.move({
      from: coorToPos(frX, frY),
      to: coorToPos(toX, toY),
      promotion: 'q'
    });
    this.setState({boardState: FENToBoard(this.chess.fen())});
    this.robotMove();
  }
  canDrop(frX, frY, toX, toY) {
    const moves = this.chess.moves({square: coorToPos(frX, frY)});
    console.log(moves);
    const fen = this.chess.fen();
    const ret = this.chess.move({
      from: coorToPos(frX, frY),
      to: coorToPos(toX, toY),
      promotion: 'q'
    }) != null;

    this.chess.load(fen);
    return ret;
  }
  canDrag(piece) {
    if (this.chess.game_over()) {
      return false;
    }
    if (this.props.robotWhite) {
      if (piece === piece.toUpperCase()) {
        return false;
      } else {
        return this.chess.turn() === 'b';
      }
    } else {
      if (piece === piece.toUpperCase()) {
        return this.chess.turn() === 'w';
      } else {
        return false;
      }
    }
  }
  render() {
    return <Board boardState={this.state.boardState}
                  movePiece={this.movePiece}
                  canDrag={this.canDrag}
                  canDrop={this.canDrop}
                  width={600}/>;
    }
}

GameVsRobot.propTypes = {
  robotWhite: PropTypes.bool.isRequired,
};
