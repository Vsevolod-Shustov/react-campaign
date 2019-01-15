(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{101:function(e,t,n){},103:function(e,t,n){},105:function(e,t,n){},107:function(e,t,n){},112:function(e,t,n){},211:function(e,t,n){"use strict";n.r(t);var a=n(0),i=n.n(a),o=n(86),r=n.n(o),s=(n(99),n(101),n(14)),c=n(15),l=n(18),h=n(16),u=n(19),p=n(12),m=(n(103),n(22)),d=(n(105),n(107),n(87)),g=n.n(d),x=n(88),y=n.n(x),b=n(89),f=n.n(b),v=n(90),E=n.n(v),O=n(91),k=n.n(O),S=function(e){function t(e){var n;return Object(s.a)(this,t),(n=Object(l.a)(this,Object(h.a)(t).call(this,e))).hexWidth=150,n.hexMargin=4,n.hexHeight=2*n.hexWidth/Math.sqrt(3),n.hexSideLength=n.hexHeight*Math.sin(Math.PI/6),n.hexVerticalOffset=(n.hexHeight-n.hexSideLength)/2,n.xPos=0,n.yPos=0,n.terrains={plains:g.a,forest:y.a,hills:f.a,mountain:E.a,swamp:k.a},n}return Object(u.a)(t,e),Object(c.a)(t,[{key:"positionHex",value:function(e,t,n,a,i,o){var r=e*n-n/2+o*e;t%2!==0&&(r+=n/2,r+=o/2),this.xPos=r;var s=t*a+o*t;t>0&&(s-=i*t),t<0&&(s+=i*Math.abs(t)),this.yPos=s}},{key:"render",value:function(){var e=this;return this.positionHex(this.props.x,this.props.y,this.hexWidth,this.hexHeight,this.hexVerticalOffset,this.hexMargin),i.a.createElement("g",{className:"hex "+this.props.terrain,transform:"translate("+this.xPos+","+this.yPos+")",onClick:function(t){return e.props.onClick(t,e.props.hexkey)}},i.a.createElement("polygon",{className:"hexagon",points:this.hexWidth/2+",0 "+this.hexWidth+","+(this.hexHeight-this.hexSideLength)/2+" "+this.hexWidth+","+(this.hexHeight/2+(this.hexHeight-this.hexSideLength)/2)+" "+this.hexWidth/2+","+this.hexHeight+" 0,"+(this.hexHeight/2+(this.hexHeight-this.hexSideLength)/2)+" 0,"+(this.hexHeight-this.hexSideLength)/2}),i.a.createElement("image",{href:this.terrains[this.props.terrain],width:this.hexWidth,height:this.hexHeight,alt:""}),i.a.createElement("text",{x:"75",y:"20",dy:".35em",fill:"#000",textAnchor:"middle"},this.props.x," ",this.props.y),i.a.createElement("text",{x:"75",y:"40",dy:".35em",fill:"#000",textAnchor:"middle"},this.props.terrain))}}]),t}(a.Component),w=n(7),j=function(e){function t(e){var n;return Object(s.a)(this,t),(n=Object(l.a)(this,Object(h.a)(t).call(this,e))).state={svgWidth:0,svgHeight:0,hexes:[{x:0,y:0,terrain:"plains"},{x:-1,y:0,terrain:"plains"},{x:1,y:0,terrain:"plains"},{x:0,y:-1,terrain:"forest"},{x:-1,y:-1,terrain:"swamp"},{x:0,y:1,terrain:"hills"},{x:-1,y:1,terrain:"mountain"}]},n.updateDimensions=n.updateDimensions.bind(Object(p.a)(Object(p.a)(n))),n.clickHex=n.clickHex.bind(Object(p.a)(Object(p.a)(n))),n}return Object(u.a)(t,e),Object(c.a)(t,[{key:"updateDimensions",value:function(){console.log("the window had been resized"),this.setState({svgWidth:window.innerWidth}),this.setState({svgHeight:window.innerHeight})}},{key:"positionMap",value:function(){console.log("positioning the map...");var e=document.getElementById("map-holder-g"),t=m.c("#map-holder-g"),n=m.c("#map-holder-svg"),a=e.getBBox().x;a*=-1;var i=e.getBBox().y;i*=-1;var o=(n.attr("width")-e.getBBox().width)/2;o+=a;var r=(n.attr("height")-e.getBBox().height)/2;r+=i,t.attr("transform","translate("+o+","+r+")")}},{key:"dragmove",value:function(){var e=document.getElementById("map-holder-g"),t=e.transform.baseVal.getItem(0);if(t.type===SVGTransform.SVG_TRANSFORM_TRANSLATE)var n=t.matrix.e,a=t.matrix.f;var i=n+m.b.dx,o=a+m.b.dy;e.setAttribute("transform","translate("+i+","+o+")")}},{key:"componentWillMount",value:function(){this.updateDimensions()}},{key:"componentDidMount",value:function(){window.addEventListener("resize",this.updateDimensions),this.positionMap();var e=m.a().on("drag",this.dragmove);m.c("#map-holder-g").call(e)}},{key:"componentDidUpdate",value:function(){this.positionMap()}},{key:"componentWillUnmount",value:function(){window.removeEventListener("resize",this.updateDimensions)}},{key:"clickHex",value:function(e,t){console.log("key is "+t);var n={type:"HEX_CLICKED",key:t};console.log("dispatching action: "+JSON.stringify(n)),this.props.dispatch(n)}},{key:"render",value:function(){var e=this;if(this.props.hexes&&this.props.hexes.map)var t=this.props.hexes.map(function(t){return i.a.createElement(S,{x:t.x,y:t.y,terrain:t.terrain,key:t.key,hexkey:t.key,onClick:e.clickHex})});else console.log("no state found by hexmap");return i.a.createElement("div",{className:"hexmap"},i.a.createElement("svg",{width:this.state.svgWidth,height:this.state.svgHeight,id:"map-holder-svg"},i.a.createElement("g",{id:"map-holder-g",transform:"translate(0,0)"},t)))}}]),t}(a.Component);var A=Object(w.b)(function(e){return console.log("mapping state to props"),{hexes:e.hexes.hexes}})(j),H=n(23),M=n(214),N=n(213),C=(n(112),function(e){function t(){var e,n;Object(s.a)(this,t);for(var a=arguments.length,o=new Array(a),r=0;r<a;r++)o[r]=arguments[r];return(n=Object(l.a)(this,(e=Object(h.a)(t)).call.apply(e,[this].concat(o)))).renderField=function(e){var t=e.input,n=e.placeholder,a=(e.label,e.type),o=e.meta,r=o.touched,s=o.error;return i.a.createElement("div",null,i.a.createElement("input",Object.assign({},t,{placeholder:n,type:a,className:"form-control"})),r&&s&&i.a.createElement("span",{className:"error"},s))},n}return Object(u.a)(t,e),Object(c.a)(t,[{key:"componentWillMount",value:function(){}},{key:"render",value:function(){var e=this,t=this.props,n=t.handleSubmit,a=t.error;return i.a.createElement("div",{className:"HexEditMenu"},i.a.createElement("div",{className:"form-horizontal",id:"hex-edit-form"},i.a.createElement(M.a,{name:"x",type:"number",component:this.renderField,placeholder:"x"}),i.a.createElement(M.a,{name:"y",type:"number",component:this.renderField,placeholder:"y"}),i.a.createElement(M.a,{className:"form-control",name:"terrain",component:"select"},i.a.createElement("option",{value:"plains"},"Plains"),i.a.createElement("option",{value:"hills"},"Hills"),i.a.createElement("option",{value:"forest"},"Forest"),i.a.createElement("option",{value:"swamp"},"Swamp"),i.a.createElement("option",{value:"mountain"},"Mountain")),a&&i.a.createElement("div",null,i.a.createElement("span",{className:"error"},i.a.createElement("strong",null,a))),i.a.createElement("button",{type:"submit",id:"add-hex-btn",className:"btn btn-primary",onClick:n(function(t){return e.props.onSubmit(Object(H.a)({},t,{action:"ADD_HEX"}))})},"Add Hex"),i.a.createElement("button",{type:"submit",id:"delete-hexes-btn",className:"btn btn-danger",onClick:n(function(t){return e.props.onSubmit(Object(H.a)({},t,{action:"DELETE_HEX"}))})},"Delete Hex"),i.a.createElement("button",{type:"submit",id:"save-map-btn",className:"btn btn-success",onClick:n(function(t){return e.props.onSubmit(Object(H.a)({},t,{action:"SAVE_MAP"}))})},"Save Map"),i.a.createElement("button",{type:"submit",id:"load-map-btn",className:"btn btn-warning",onClick:n(function(t){return e.props.onSubmit(Object(H.a)({},t,{action:"LOAD_MAP"}))})},"Load Map"),i.a.createElement("button",{type:"submit",id:"clear-map-btn",className:"btn btn-danger",onClick:n(function(t){return e.props.onSubmit(Object(H.a)({},t,{action:"CLEAR_MAP"}))})},"Clear Map"),i.a.createElement("button",{type:"submit",id:"clear-save-btn",className:"btn btn-danger",onClick:n(function(t){return e.props.onSubmit(Object(H.a)({},t,{action:"CLEAR_SAVE"}))})},"Clear Save")))}}]),t}(a.Component));C=Object(N.a)({form:"hexeditform"})(C);var D=Object(w.b)(function(e){var t=e.hexes.hexes.find(function(t){return t.key===e.ui.selectedHexKey});return{initialValues:t?{x:t.x.toString(),y:t.y.toString(),terrain:t.terrain}:{x:"0",y:"0",terrain:"plains"},enableReinitialize:!0}})(C),L=n(212),_=function(e){function t(e){var n;return Object(s.a)(this,t),(n=Object(l.a)(this,Object(h.a)(t).call(this,e))).handleSubmit=function(e){"ADD_HEX"===e.action||"DELETE_HEX"===e.action?function(e){if(console.log("values: "+JSON.stringify(e)),console.log("x: "+e.x),console.log("parsed x: "+parseInt(e.x)),!e.x||!parseInt(e.x)&&0!==parseInt(e.x))throw console.log("something's wrong with X"),new L.a({x:"must be a number"});return!0}(e)&&function(e){if(!e.y||!parseInt(e.y)&&0!==parseInt(e.y))throw console.log("something's wrong with y"),new L.a({y:"must be a number"});return!0}(e)&&n.dispatchAction(e):n.dispatchAction(e)},n.dispatchAction=n.dispatchAction.bind(Object(p.a)(Object(p.a)(n))),n}return Object(u.a)(t,e),Object(c.a)(t,[{key:"dispatchAction",value:function(e){var t={type:e.action,x:e.x,y:e.y,terrain:e.terrain};console.log("dispatching action: "+JSON.stringify(t)),this.props.dispatch(t)}},{key:"render",value:function(){return i.a.createElement("div",{id:"app"},i.a.createElement("div",{id:"container"},i.a.createElement(A,null),i.a.createElement(D,{onSubmit:this.handleSubmit})))}}]),t}(a.Component),P=Object(w.b)()(_),W=n(93),I=n(5),J=n(215),B={hexes:[{key:"0 0",x:0,y:0,terrain:"plains"},{key:"-1 0",x:-1,y:0,terrain:"plains"},{key:"1 0",x:1,y:0,terrain:"plains"},{key:"0 -1",x:0,y:-1,terrain:"forest"},{key:"-1 -1",x:-1,y:-1,terrain:"swamp"},{key:"0 1",x:0,y:1,terrain:"hills"},{key:"-1 1",x:-1,y:1,terrain:"mountain"}]},V={selectedHexKey:"0 0"};var X=Object(I.b)({hexes:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:B,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"ADD_HEX":return console.log("received ADD_HEX action"),console.log("action content: "+JSON.stringify(t)),e.hexes.find(function(e){return e.key===t.x+" "+t.y})?(alert("this hex already exists"),e):Object.assign({},e,{hexes:[].concat(Object(W.a)(e.hexes),[{key:t.x+" "+t.y,x:t.x,y:t.y,terrain:t.terrain}])});case"DELETE_HEX":if(console.log("received DELETE_HEX action"),console.log("action content: "+JSON.stringify(t)),e.hexes.find(function(e){return e.key===t.x+" "+t.y})){var n=t.x+" "+t.y;return{hexes:e.hexes.filter(function(e){return e.key!==n})}}return alert("no such hex found"),e;case"SAVE_MAP":return console.log("received SAVE_MAP action"),console.log("action content: "+JSON.stringify(t)),localStorage.globalMap=JSON.stringify(e),e;case"LOAD_MAP":return console.log("received LOAD_MAP action"),console.log("action content: "+JSON.stringify(t)),localStorage.globalMap?{hexes:JSON.parse(localStorage.globalMap).hexes}:(console.log("no save found"),e);case"CLEAR_MAP":return console.log("received CLEAR_MAP action"),console.log("action content: "+JSON.stringify(t)),{hexes:[]};case"CLEAR_SAVE":return console.log("received CLEAR_SAVE action"),console.log("action content: "+JSON.stringify(t)),localStorage.globalMap?localStorage.removeItem("globalMap"):console.log("no save found"),e;default:return e}},form:J.a,ui:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:V,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"HEX_CLICKED":return console.log("received HEX_CLICKED action"),console.log("action content: "+JSON.stringify(t)),Object.assign({},e,{selectedHexKey:t.key.toString()});default:return e}}}),R=Object(I.c)(X);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(i.a.createElement(w.a,{store:R},i.a.createElement(P,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},87:function(e,t,n){e.exports=n.p+"static/media/plains.4105161a.svg"},88:function(e,t,n){e.exports=n.p+"static/media/forest.17188498.svg"},89:function(e,t,n){e.exports=n.p+"static/media/hills.a91d9dd6.svg"},90:function(e,t,n){e.exports=n.p+"static/media/mountain.b4cf49cf.svg"},91:function(e,t,n){e.exports=n.p+"static/media/swamp.c89a4a04.svg"},94:function(e,t,n){e.exports=n(211)},99:function(e,t,n){}},[[94,2,1]]]);
//# sourceMappingURL=main.d0b86892.chunk.js.map