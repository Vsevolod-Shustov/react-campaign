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
    this.getTransformation = this.getTransformation.bind(this);
    this.zoomed = this.zoomed.bind(this);
    
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
  
  getTransformation(transform) {
    // Create a dummy g for calculation purposes only. This will never
    // be appended to the DOM and will be discarded once this function 
    // returns.
    let g = document.createElementNS("http://www.w3.org/2000/svg", "g");
    
    // Set the transform attribute to the provided string value.
    g.setAttributeNS(null, "transform", transform);
    
    // consolidate the SVGTransformList containing all transformations
    // to a single SVGTransform of type SVG_TRANSFORM_MATRIX and get
    // its SVGMatrix. 
    let matrix = g.transform.baseVal.consolidate().matrix;
    
    // Below calculations are taken and adapted from the private function
    // transform/decompose.js of D3's module d3-interpolate.
    let {a, b, c, d, e, f} = matrix;   // ES6, if this doesn't work, use below assignment
    // var a=matrix.a, b=matrix.b, c=matrix.c, d=matrix.d, e=matrix.e, f=matrix.f; // ES5
    let scaleX, scaleY, skewX;
    if (scaleX === Math.sqrt(a * a + b * b)) {a /= scaleX; b /= scaleX;};
    if (skewX === a * c + b * d) {c -= a * skewX; d -= b * skewX;};
    if (scaleY === Math.sqrt(c * c + d * d)) {c /= scaleY; d /= scaleY; skewX /= scaleY;};
    if (a * d < b * c) {a = -a; b = -b; skewX = -skewX; scaleX = -scaleX;};
    return {
      translateX: e,
      translateY: f,
      rotate: Math.atan2(b, a) * 180 / Math.PI,
      skewX: Math.atan(skewX) * 180 / Math.PI,
      scaleX: scaleX,
      scaleY: scaleY
    }
  }
  
  
  
  /*positionMap(){
    console.log('positioning the map...');
    let mapholder = document.getElementById("map-holder-g");
    let svg = document.getElementById("map-holder-svg");
    let svgComputedStyles = window.getComputedStyle(svg);
    
    //position top left corner of the map to top left corner of svg
    let mapXresetPos = mapholder.getBBox().x;
    //console.log("getBBox X is "+mapXresetPos);
    mapXresetPos*=-1;
    let mapYresetPos = mapholder.getBBox().y;
    //console.log("getBBox Y is "+mapYresetPos);
    mapYresetPos*=-1;
    //mapholder.attribute("transform", "translate("+mapXresetPos+","+mapYresetPos+")");

    //center the map
    let mapXpos = (parseInt(svgComputedStyles.getPropertyValue("width")) - mapholder.getBBox().width)/2;
    //console.log(svgComputedStyles.getPropertyValue("width"));
    mapXpos = mapXpos + mapXresetPos;
    let mapYpos = (parseInt(svgComputedStyles.getPropertyValue("height")) - mapholder.getBBox().height)/2;
    mapYpos = mapYpos + mapYresetPos;
    
    //check for zoom
    let xforms = mapholder.transform.baseVal; // An SVGTransformList
    let firstXForm = xforms.getItem(0);       // An SVGTransform
    /*if (firstXForm.type === SVGTransform.SVG_TRANSFORM_TRANSLATE){
      var firstX = firstXForm.matrix.e,
          firstY = firstXForm.matrix.f;
    }*/
    //console.log(firstXForm.matrix.a);
    //console.log(firstXForm.matrix.d);
    
    //mapholder.setAttribute("transform", "translate("+mapXpos+","+mapYpos+")"); //console.log(document.getElementById("map-holder-g").getBBox());
    /*if(scope.firstload == true) {
      mapholder.attribute("transform", "translate("+mapXpos+","+mapYpos+")");
    } else {
      mapholder.transition(500).attribute("transform", "translate("+mapXpos+","+mapYpos+")");
    };*/
  //}
  
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
    //return [mapXpos, mapYpos];
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
  
  zoomed() {
    var mapholder = document.getElementById("map-holder-g");
    var currentTransf = this.getTransformation(mapholder.getAttribute("transform"));
    let currentx = currentTransf.translateX;
    let currenty = currentTransf.translateY;
    let currentzoom = currentTransf.scaleX;
    console.log("cX: " + currentx + ", cY: " + currenty);
    console.log('d3 event transform: ' + d3.event.transform);
    console.log('d3 event: ' + toString(d3.event));
    let g = d3.select("#map-holder-g");
    
    
    
    g.attr("transform", d3.event.transform);
  }
  
  componentWillMount() {
    this.updateDimensions();
  }
  
  componentDidMount() {
    window.addEventListener("resize", this.updateDimensions);
    this.positionMap();
    
    let drag = d3.drag().on("drag", this.dragmove);
    d3.select("#map-holder-g")
      .call(drag);
      
    let hexsvg = d3.select('#map-holder-svg');
    var hexmap = d3.select("#map-holder-g");
    /*hexsvg.call(d3.zoom().on('zoom', function() {
      let transform = d3.zoomTransform(this);
      console.log('current transform: ' + transform);
      console.log('event transform: ' + d3.event.transform);
      hexmap.attr('transform', d3.event.transform);
    }));*/
    //hexsvg.call(d3.zoom().on('zoom', this.zoomed));
    /*let zoom = d3.zoom()
      .on("zoom", this.zoomed);
    let svg = d3.select('#map-holder-svg');
    svg.call(zoom);*/
    
    this.positionMap();
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
