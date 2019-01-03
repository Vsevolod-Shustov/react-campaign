import React, { Component } from 'react';
import * as d3 from 'd3';
import './Hexmap.css';
import Hex from '../hex/Hex.js';

class Hexmap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hexes: [
      {"x": 0, "y": 0, "terrain": "plains"}
      ]
    };
    this.updateDimensions = this.updateDimensions.bind(this);
    this.svgWidth = window.innerWidth;
    this.svgHeight = window.innerHeight;
  }
  

    
  updateDimensions() {
    
  }
  
  render() {
  
    //hex graphics dimensions
    let hexWidth = 150;
    let hexHeight = 2*hexWidth/Math.sqrt(3);
    let hexSideLength = hexHeight*Math.sin(Math.PI/6);
    let hexVerticalOffset = (hexHeight-hexSideLength)/2;
    let hexMargin = 4;
    //let hexVerticalOffset = hexVerticalOffset + hexMargin;
    
    //hex polygon points
    let hexagon = [
      {"x":hexWidth/2, "y":0},
      {"x":hexWidth, "y":(hexHeight-hexSideLength)/2},
      {"x":hexWidth, "y":hexHeight/2+(hexHeight-hexSideLength)/2},
      {"x":hexWidth/2, "y":hexHeight},
      {"x":0, "y":hexHeight/2+(hexHeight-hexSideLength)/2},
      {"x":0, "y":(hexHeight-hexSideLength)/2}
    ];
        
    let renderedHexes = this.state.hexes.map((hex) => <Hex x={hex.x} y={hex.y} terrain={hex.terrain} />);
    return (
      <div className="hexmap">
        <svg width={this.svgWidth} height={this.svgHeight} id="map-holder-svg">
          {renderedHexes}
        </svg>
      </div>
    );
  }
}

export default Hexmap;
