import React, { Component } from 'react';
import * as d3 from 'd3';
import './Hexmap.css';
import Hex from '../hex/Hex.js';

class Hexmap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      svgWidth: 0,
      svgHeight: 0,
      hexes: [
      {"x": 0, "y": 0, "terrain": "plains"},
      {"x": -1, "y": 0, "terrain": "plains"},
      {"x": 1, "y": 0, "terrain": "plains"},
      {"x": 0, "y": -1, "terrain": "forest"},
      {"x": -1, "y": -1, "terrain": "swamp"},
      {"x": 0, "y": 1, "terrain": "hills"},
      {"x": -1, "y": 1, "terrain": "mountain"},
      ]
    };
    this.updateDimensions = this.updateDimensions.bind(this);
    //this.svgWidth = window.innerWidth;
    //this.svgHeight = window.innerHeight;
  }
  

    
  updateDimensions() {
    console.log("the window had been resized");
    //this.svgWidth = window.innerWidth;
    //this.svgHeight = window.innerHeight;
    //this.forceUpdate();
    //this.setState({ svgWidth: window.innerWidth });
    //this.setState({ svgHeight: window.innerHeight });
    this.setState({ svgWidth: window.innerWidth });
    this.setState({ svgHeight: window.innerHeight });
  }
  
  positionMap(){
    console.log('positioning the map...');
    let mapholder = document.getElementById("map-holder-g");
    let svg = document.getElementById("map-holder-svg");
    let svgComputedStyles = window.getComputedStyle(svg);
    //position top left corner of the map to top left corner of svg
    let mapXresetPos = mapholder.getBBox().x;
    console.log("getBBox X is "+mapXresetPos);
    mapXresetPos*=-1;
    let mapYresetPos = mapholder.getBBox().y;
    console.log("getBBox Y is "+mapYresetPos);
    mapYresetPos*=-1;
    //mapholder.attribute("transform", "translate("+mapXresetPos+","+mapYresetPos+")");

    //center the map
    let mapXpos = (parseInt(svgComputedStyles.getPropertyValue("width")) - mapholder.getBBox().width)/2;
    console.log(svgComputedStyles.getPropertyValue("width"));
    mapXpos = mapXpos + mapXresetPos;
    let mapYpos = (parseInt(svgComputedStyles.getPropertyValue("height")) - mapholder.getBBox().height)/2;
    mapYpos = mapYpos + mapYresetPos;
    
    mapholder.setAttribute("transform", "translate("+mapXpos+","+mapYpos+")"); //console.log(document.getElementById("map-holder-g").getBBox());
    /*if(scope.firstload == true) {
      mapholder.attribute("transform", "translate("+mapXpos+","+mapYpos+")");
    } else {
      mapholder.transition(500).attribute("transform", "translate("+mapXpos+","+mapYpos+")");
    };*/
  }
  
  dragmove() {
    let mapholder = document.getElementById("map-holder-g");
    //get transform
    var xforms = mapholder.transform.baseVal; // An SVGTransformList
    var firstXForm = xforms.getItem(0);       // An SVGTransform
    if (firstXForm.type === SVGTransform.SVG_TRANSFORM_TRANSLATE){
      var firstX = firstXForm.matrix.e,
          firstY = firstXForm.matrix.f;
    }
    let xmove = firstX + d3.event.dx;
    let ymove = firstY + d3.event.dy;
    mapholder.setAttribute('transform', 'translate('+xmove+','+ymove+')');
  };
  
  componentWillMount() {
    this.updateDimensions();
  }
  
  componentDidMount() {
    window.addEventListener("resize", this.updateDimensions);
    this.positionMap();
    
    let drag = d3.drag().on("drag", this.dragmove);
    d3.select("#map-holder-g")
      .call(drag);
  }
  
  componentDidUpdate() {
    this.positionMap();
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }
  
  render() {
    
        
    let renderedHexes = this.state.hexes.map((hex) =>
      <Hex
        x={hex.x}
        y={hex.y}
        terrain={hex.terrain}
        
      />);
    return (
      <div className="hexmap">
        <svg width={this.state.svgWidth} height={this.state.svgHeight} id="map-holder-svg">
          <g id="map-holder-g" transform="translate(0,0)">
            {renderedHexes}
          </g>
        </svg>
      </div>
    );
  }
}

export default Hexmap;
