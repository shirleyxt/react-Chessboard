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
    this.state = {gameMode: true};
  }
  handleClick = (mode) => {
    this.setState({gameMode: mode});
  }
  render() {
    let gameMode;
    if (this.state.gameMode) {
      gameMode = <div style={{height: '600px', width: '600px'}}><Game /></div>;
    } else {
      gameMode = <div style={{height: '600px', width: '600px'}}>
                      <GameVsRobot robotWhite={false}/>
                 </div>;
    }
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to Chess Game</h1>
        </header>
        <ul>
          <li>Left board for Robot vs Human</li>
          <button onClick={()=>this.handleClick(true)}>
            Human VS Human
          </button>
          <li>Right board for Human vs Human</li>
          <button onClick={()=>this.handleClick(false)}>
            Human VS Robot
          </button>
        </ul>
          {gameMode}
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(App);
