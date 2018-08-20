import React, { Component } from 'react';
import Board from './Board';
import Chess from 'chess.js';
import {boardToFEN, FENToBoard, coorToPos} from './Constants';

const initialBoard = ["r","n", "b", "q", "k", "b", "n", "r",
                      "p", "p", "p", "p", "p", "p", "p", "p",
                      " ", " ", " ", " ", " ", " ", " ", " ",
                      " ", " ", " ", " ", " ", " ", " ", " ",
                      " ", " ", " ", " ", " ", " ", " ", " ",
                      " ", " ", " ", " ", " ", " ", " ", " ",
                      "P", "P", "P", "P", "P", "P", "P", "P",
                      "R", "N", "B", "Q", "K", "B", "N", "R",
                    ];


export default class Game extends Component {
  constructor(props) {
    super(props);
    this.chess = new Chess();
    this.chess.reset();
    this.state = {boardState: FENToBoard(this.chess.fen())};
    this.movePiece = this.movePiece.bind(this);
    this.canDrag = this.canDrag.bind(this);
    this.canDrop = this.canDrop.bind(this);
  }
  movePiece(frX, frY, toX, toY) {
    this.chess.move({
      from: coorToPos(frX, frY),
      to: coorToPos(toX, toY)
    });
    let currentState = this.state.boardState.slice();
    this.setState({boardState: FENToBoard(this.chess.fen())});
  }
  canDrop(frX, frY, toX, toY) {
    const fen = this.chess.fen();
    const ret = this.chess.move({
      from: coorToPos(frX, frY),
      to: coorToPos(toX, toY)
    }) != null;

    //console.log(this.chess.ascii());
    console.log({tx: toX, ty:toY, fx:frX, fy:frY, ret: ret});
    this.chess.load(fen);
    return ret;
  }
  canDrag(piece) {
    if (this.chess.game_over()) {
      return false;
    }
    if (piece === piece.toUpperCase()) {
      return this.chess.turn() === 'w';
    } else {
      return this.chess.turn() === 'b';
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
