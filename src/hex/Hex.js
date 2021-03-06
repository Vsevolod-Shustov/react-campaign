import React, { Component } from 'react';
import styled from 'styled-components'
//import './Hex.css';
import plains from './plains.svg';
import forest from './forest.svg';
import hills from './hills.svg';
import mountain from './mountain.svg';
import swamp from './swamp.svg';

const Polygon = styled.polygon`
  stroke:black;
  stroke-width:2;
  fill:white;
  .plains & {
    fill:#e7f79c;
  }
  .forest & {
    fill:#7aad43;
  }
  .hills & {
    fill:#c3d263;
  }
  .mountain & {
    fill:#b28000;
  }
  .swamp & {
    fill:#addea5;
  }
`

const G = styled.g`
  :hover {
    > ${Polygon} {
      stroke:#0c0;
    }
  }
  
  text {
    paint-order: stroke;
    stroke: #fff;
    stroke-width: 2px;
  }
`


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
  
  render() {    
    this.positionHex(this.props.x, this.props.y, this.hexWidth, this.hexHeight, this.hexVerticalOffset, this.hexMargin);
    
    return (
      <G
        className={"hex " + this.props.terrain}
        transform={"translate(" + this.xPos + "," + this.yPos + ")"}
        onClick={(event) => this.props.onClick(event, this.props.hexkey)}
      >
        <Polygon className="hexagon"
          points = {
            this.hexWidth/2 + "," + 0 + " " +
            this.hexWidth + "," + (this.hexHeight-this.hexSideLength)/2 + " " +
            this.hexWidth + "," + (this.hexHeight/2+(this.hexHeight-this.hexSideLength)/2) + " " +
            this.hexWidth/2 + "," + this.hexHeight + " " +
            0 + "," + (this.hexHeight/2+(this.hexHeight-this.hexSideLength)/2) + " " +
            0 + "," + (this.hexHeight-this.hexSideLength)/2
          }
        >
        </Polygon>
        <image href={this.terrains[this.props.terrain]} width={this.hexWidth} height={this.hexHeight} alt=""></image>
        <text x="75" y="20" dy=".35em" fill="#000" textAnchor="middle">{this.props.x} {this.props.y}</text>
        <text x="75" y="40" dy=".35em" fill="#000" textAnchor="middle">{this.props.terrain}</text>
      </G>
    );
  }
}

export default Hex;