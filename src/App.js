import React, { Component } from 'react';
import './App.css';
import Hexmap from './hexmap/Hexmap.js';
import HexEditMenu from './hexeditmenu/HexEditMenu.js';
import { connect } from 'react-redux';

class App extends Component {
  handleSubmit = (values) => {
    console.log("values: " + JSON.stringify(values));
    let action = {
      type: values.action,
      "x": values.x,
      "y": values.y,
      "terrain": values.terrain
    };
    console.log("action: " + JSON.stringify(action));
    this.props.dispatch(action);
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

//export default App;
export default connect()(App);