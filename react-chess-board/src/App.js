import React, { Component } from 'react';
import logo from './logo.svg';
import Game from './Game';
import './App.css';
import HTML5Backend from 'react-dnd-html5-backend';
//import PieceLayer from './PieceLayer';
import { DragDropContext } from 'react-dnd';

class App extends Component {
  render() {
    //<PieceLayer />
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div style={{height: '600px', width: '600px'}}>
          <Game />
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(App);
