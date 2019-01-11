import React, { Component } from 'react';
import './Hex.css';
import plains from './plains.svg';
import forest from './forest.svg';
import hills from './hills.svg';
import mountain from './mountain.svg';
import swamp from './swamp.svg';
//import * as d3 from 'd3';

class Hex extends Component {
  constructor(props) {
    super(props);
    
    this.hexWidth = 150;
    this.hexMargin = 4;
    
    this.hexHeight = 2*this.hexWidth/Math.sqrt(3);
    this.hexSideLength = this.hexHeight*Math.sin(Math.PI/6);
    this.hexVerticalOffset = (this.hexHeight-this.hexSideLength)/2;
    
    this.xPos = 0;
    this.yPos = 0;
    
    this.terrains = {
      "plains": plains,
      "forest": forest,
      "hills": hills,
      "mountain": mountain,
      "swamp": swamp
    }
    this.clickHex = this.clickHex.bind(this);
  }
  
  clickHex(e) {
    e.preventDefault();
    console.log(this.props.x + " " + this.props.y);
  }
  
  positionHex(x, y, hexWidth, hexHeight, hexVerticalOffset, hexMargin) {
    let xPos = x*hexWidth-hexWidth/2+hexMargin*x;
    if(y%2!==0){xPos+=hexWidth/2;xPos+=hexMargin/2};
    this.xPos = xPos;
    
    let yPos = y*hexHeight+hexMargin*y;
    if(y>0){yPos-=hexVerticalOffset*y};
    if(y<0){yPos+=hexVerticalOffset*Math.abs(y)};
    this.yPos = yPos;
  }
  
  
  
  /*drawHex(x, y, hexWidth, hexHeight, hexSideLength, hexMargin) {
    //hex polygon points
    let hexagon = [
      {"x":hexWidth/2, "y":0},
      {"x":hexWidth, "y":(hexHeight-hexSideLength)/2},
      {"x":hexWidth, "y":hexHeight/2+(hexHeight-hexSideLength)/2},
      {"x":hexWidth/2, "y":hexHeight},
      {"x":0, "y":hexHeight/2+(hexHeight-hexSideLength)/2},
      {"x":0, "y":(hexHeight-hexSideLength)/2}
    ];
  }*/
  
  render() {
    //hex graphics dimensions
    
    
    //this.drawHex(this.props.x, this.props.y, this.hexWidth, this.hexMargin);
    
    this.positionHex(this.props.x, this.props.y, this.hexWidth, this.hexHeight, this.hexVerticalOffset, this.hexMargin);
    
    return (
      <g
        className={"hex " + this.props.terrain}
        onClick={this.clickHex}
        transform={"translate(" + this.xPos + "," + this.yPos + ")"}
      >
        <polygon className="hexagon"
          points = {
            this.hexWidth/2 + "," + 0 + " " +
            this.hexWidth + "," + (this.hexHeight-this.hexSideLength)/2 + " " +
            this.hexWidth + "," + (this.hexHeight/2+(this.hexHeight-this.hexSideLength)/2) + " " +
            this.hexWidth/2 + "," + this.hexHeight + " " +
            0 + "," + (this.hexHeight/2+(this.hexHeight-this.hexSideLength)/2) + " " +
            0 + "," + (this.hexHeight-this.hexSideLength)/2
          }
        >
        </polygon>
        <image href={this.terrains[this.props.terrain]} width={this.hexWidth} height={this.hexHeight} alt=""></image>
        <text x="75" y="20" dy=".35em" fill="#000" textAnchor="middle">{this.props.x} {this.props.y}</text>
        <text x="75" y="40" dy=".35em" fill="#000" textAnchor="middle">{this.props.terrain}</text>
      </g>
    );
  }
}

export default Hex;
