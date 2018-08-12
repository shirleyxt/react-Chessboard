import React, { Component } from 'react';
import Board from './Board';

const initialBoard = ["r","n", "b", "q", "k", "b", "n", "r",
                      "p", "p", "p", "p", "p", "p", "p", "p",
                      " ", " ", " ", " ", " ", " ", " ", " ",
                      " ", " ", " ", " ", " ", " ", " ", " ",
                      " ", " ", " ", " ", " ", " ", " ", " ",
                      " ", " ", " ", " ", " ", " ", " ", " ",
                      "p", "p", "p", "p", "p", "p", "p", "p",
                      "R", "B", "B", "Q", "K", "B", "N", "R",
                    ];

export default class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {boardState: initialBoard};
    this.movePiece = this.movePiece.bind(this);
  }
  movePiece(frX, frY, toX, toY) {
    let currentState = this.state.boardState.slice();
    let start = frX * 8 + frY;
    let end = toX * 8 + toY;
    if (start == end) return;
    currentState[end] = currentState[start];
    currentState[start] = " ";
    this.setState({boardState: currentState});
  }
  render() {
    return <Board boardState={this.state.boardState} movePiece={this.movePiece}/>;
  }
}
