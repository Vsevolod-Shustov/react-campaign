import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Hexmap from './hexmap/Hexmap.js';

class App extends Component {
  render() {
    return (
      <div id="app">
        <div id="container">
          <Hexmap />
        </div>
      </div>
    );
  }
}

export default App;
