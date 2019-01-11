import React, { Component } from 'react';
import './App.css';
import Hexmap from './hexmap/Hexmap.js';
import HexEditMenu from './hexeditmenu/HexEditMenu.js';
import { connect } from 'react-redux';
import { SubmissionError } from 'redux-form'

class App extends Component {  
  constructor(props) {
    super(props);
    this.dispatchAction = this.dispatchAction.bind(this);
  }
  
  dispatchAction(values) {
      let action = {
          type: values.action,
          "x": values.x,
          "y": values.y,
          "terrain": values.terrain
        };
      console.log("dispatching action: " + JSON.stringify(action));
      this.props.dispatch(action);
    }
    
  handleSubmit = (values) => {
    //console.log("values: " + JSON.stringify(values));

    function validateX(values) {
      console.log("values: " + JSON.stringify(values));
      console.log("x: " + values.x);
      console.log("parsed x: " + parseInt(values.x));
      if (!values.x || (!parseInt(values.x) && parseInt(values.x) !== 0)) {
        console.log("something's wrong with X");
        throw new SubmissionError({
          x: 'must be a number'
        })
      } else {
        return true
      }
    }
    
    function validateY(values) {
      if (!values.y || (!parseInt(values.y) && parseInt(values.y) !== 0)) {
        console.log("something's wrong with y");
        throw new SubmissionError({
          y: 'must be a number'
        })
      }else {
        return true
      }
    }
    
    if (!validateX(values) || !validateY(values)) {

    } else {
      this.dispatchAction(values);
    }
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