import React, { Component } from 'react';
import Board from './Board';
import Chess from 'chess.js';
import {boardToFEN, FENToBoard, coorToPos} from './Constants';
import PropTypes from 'prop-types';
import {findBestMove} from './ChessAI.js';
import axios from 'axios';

const USE_BACKEND = true;

export default class GameVsRobot extends Component {
  constructor(props) {
    super(props);
    this.chess = new Chess();
    this.chess.reset();
    this.state = {
      boardState: FENToBoard(this.chess.fen()),
      waitingForRobot: false,
    };
    this.movePiece = this.movePiece.bind(this);
    this.canDrag = this.canDrag.bind(this);
    this.canDrop = this.canDrop.bind(this);
    this.robotMove = this.robotMove.bind(this);
  }

  fetchRobotMove() {
    axios.get('/api/getstate', {
      params: {
        board: this.chess.fen(),
      },
    }).then(response => {
      this.chess.load(response.data);
      this.setState({
        boardState: FENToBoard(this.chess.fen()),
        waitingForRobot: false,
      });
    })
  }

  robotMove() {
    if (USE_BACKEND) {
      this.fetchRobotMove();
      return;
    }

    const validMoves = this.chess.moves();
    let bestMove;
    let bestScore = -9999;
    const currentTurn = this.chess.turn();
    for (let i = 0; i < validMoves.length; i++) {
      this.chess.move(validMoves[i]);
      let currentScore = findBestMove(2, this.chess, currentTurn, bestScore);
      if (currentScore > bestScore) {
        bestScore = currentScore;
        bestMove = validMoves[i];
      }
      this.chess.undo();
    }
    this.chess.move(bestMove);
    this.setState({
      boardState: FENToBoard(this.chess.fen()),
      waitingForRobot: false,
    });
  }
  movePiece(frX, frY, toX, toY) {
    this.chess.move({
      from: coorToPos(frX, frY),
      to: coorToPos(toX, toY),
      promotion: 'q'
    });
    this.setState({
      boardState: FENToBoard(this.chess.fen()),
      waitingForRobot: true,
    }, () => this.robotMove());
  }
  canDrop(frX, frY, toX, toY) {
    const moves = this.chess.moves({square: coorToPos(frX, frY)});
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
    return (
      <div>
        <Board boardState={this.state.boardState}
               movePiece={this.movePiece}
               canDrag={this.canDrag}
               canDrop={this.canDrop}
               width={600}/>
        <label> {this.state.waitingForRobot ?
                   "Waiting for robot to make a move..." :
                   "Now it's your turn!"
                 }
        </label>
      </div>
    );
  }
}

GameVsRobot.propTypes = {
  robotWhite: PropTypes.bool.isRequired,
};
