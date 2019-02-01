import React, { Component } from 'react';
import * as d3 from 'd3';
import './Hexmap.css';
import Hex from '../hex/Hex.js';
import { connect } from "react-redux";

class Hexmap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      svgWidth: 0,
      svgHeight: 0
    };
    this.updateDimensions = this.updateDimensions.bind(this);
    this.clickHex = this.clickHex.bind(this);
  }
   
  updateDimensions() {
    console.log("the window had been resized");
    this.setState({ svgWidth: window.innerWidth });
    this.setState({ svgHeight: window.innerHeight });
  }
  
  positionMap() {
    console.log('positioning the map...');
    let mapholder = document.getElementById("map-holder-g");
    let g = d3.select("#map-holder-g");
    let svg = d3.select("#map-holder-svg");
    //position top left corner of the map to top left corner of svg
    let mapXresetPos = mapholder.getBBox().x; mapXresetPos*=-1;
    let mapYresetPos = mapholder.getBBox().y; mapYresetPos*=-1;
    //mapholder.attr("transform", "translate("+mapXresetPos+","+mapYresetPos+")");

    //center the map
    let mapXpos = (svg.attr('width') - mapholder.getBBox().width)/2;
    mapXpos = mapXpos + mapXresetPos;
    let mapYpos = (svg.attr('height') - mapholder.getBBox().height)/2;
    mapYpos = mapYpos + mapYresetPos;
    
    g.attr("transform", "translate("+mapXpos+","+mapYpos+")");
  }
  
  dragmove() {
    let mapholder = document.getElementById("map-holder-g");
    //get transform
    let xforms = mapholder.transform.baseVal; // An SVGTransformList
    let firstXForm = xforms.getItem(0);       // An SVGTransform
    if (firstXForm.type === SVGTransform.SVG_TRANSFORM_TRANSLATE){
      var firstX = firstXForm.matrix.e,
          firstY = firstXForm.matrix.f;
    }
    let xmove = firstX + d3.event.dx;
    let ymove = firstY + d3.event.dy;
    mapholder.setAttribute('transform', 'translate('+xmove+','+ymove+')');
  }
  
  
  
  componentWillMount() {
    this.updateDimensions();
  }
  
  componentDidMount() {
    window.addEventListener("resize", this.updateDimensions);
    this.positionMap();
    
    let drag = d3.drag()
      .on("drag", this.dragmove);
    d3.select("#map-holder-g")
      .call(drag);
  }
  
  componentDidUpdate() {
    this.positionMap();
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }
  
  clickHex(event, key) {
    //event.stopPropagation();
    console.log("key is " + key);
    let action = {
      type: "HEX_CLICKED",
      "key": key
    };
    console.log("dispatching action: " + JSON.stringify(action));
    this.props.dispatch(action);
  }
  
  render() {
    if(this.props.hexes && this.props.hexes.map){
      var renderedHexes = this.props.hexes.map((hex) =>
        <Hex
          x={hex.x}
          y={hex.y}
          terrain={hex.terrain}
          key={hex.key}
          hexkey={hex.key}
          onClick={this.clickHex}
        />);
    } else {
      console.log("no state found by hexmap");
    }
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

function mapStateToProps(state) {
  console.log("mapping state to props");
  //console.log("state is " + JSON.stringify(state));
  return {
    hexes: state.hexes.hexes
  };
}

//export default Hexmap;
export default connect(mapStateToProps)(Hexmap);