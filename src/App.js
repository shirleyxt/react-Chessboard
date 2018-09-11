import React, { Component } from 'react';
import logo from './logo.svg';
import Game from './Game';
import './App.css';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import GameVsRobot from './GameVsRobot';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {vsRobot: false};
  }
  flipMode = () => {
    this.setState({vsRobot: !this.state.vsRobot});
  }
  render() {
    let gameBoard;
    if (this.state.vsRobot) {
      gameBoard = <div style={{height: '600px', width: '600px'}}>
                      <GameVsRobot robotWhite={false}/>
                 </div>;
    } else {
      gameBoard = <div style={{height: '600px', width: '600px'}}><Game /></div>;
    }
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to Chess Game</h1>
        </header>
        <label>Current Mode: {!this.state.vsRobot ? "Human VS Human" : "Human VS Robot"} </label>
        <button onClick={this.flipMode}>
          Switch to {this.state.vsRobot ? "Human VS Human" : "Human VS Robot"}
        </button>
        {gameBoard}
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(App);
