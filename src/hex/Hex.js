import React, { Component } from 'react';
import './Hex.css';

class Hex extends Component {
  render() {
    return (
      <g className={"hex " + this.props.terrain}>
        <text x="75" y="20" dy=".35em" fill="#000" text-anchor="middle">{this.props.x} {this.props.y}</text>
      </g>
    );
  }
}

export default Hex;
