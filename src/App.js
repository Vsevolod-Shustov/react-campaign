import React, { Component } from 'react';
import './App.css';
import Hexmap from './hexmap/Hexmap.js';
import HexEditMenu from './hexeditmenu/HexEditMenu.js';

class App extends Component {
  handleSubmit = (values) => {
    // Do something with the form values
    console.log(values);
  }
  render() {
    return (
      <div id="app">
        <div id="container">
          <Hexmap />
          <HexEditMenu onSubmit={this.handleSubmit} />
        </div>
      </div>
    );
  }
}

export default App;
