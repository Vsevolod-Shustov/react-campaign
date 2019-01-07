import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import './HexEditMenu.css';

class HexEditMenu extends Component {
  render() {
    const { handleSubmit } = this.props;
    return (
      <div className="HexEditMenu">
        <form onSubmit={handleSubmit} className="form-horizontal" id="hex-edit-form">
          <Field className="form-control" name="x" component="input" type="number" placeholder="x"/>
          <Field className="form-control" name="y" component="input" type="number" placeholder="y"/>
          <button type="submit">Submit</button>
          
          <select className="form-control" id="terrain">
            <option value="plains">Plains</option>
            <option value="hills">Hills</option>
            <option value="forest">Forest</option>
            <option value="swamp">Swamp</option>
            <option value="mountain">Mountain</option>
          </select> 
            
          <button type="submit" id="add-hex-btn" className="btn btn-primary">Add Hex</button>

          <div id="add-hexes-message"></div>

          <button type="submit" id="save-map-btn" className="btn btn-success">Save Map Data</button>
          <button type="submit" id="load-map-btn" className="btn btn-warning">Load Map</button>
          <button type="submit" id="delete-hexes-btn" className="btn btn-danger">Delete Hex</button>
          <button type="submit" id="clear-map-btn" className="btn btn-danger">Clear Map</button>
          <button type="submit" id="clear-save-btn" className="btn btn-danger">Clear Save Data</button>
        </form>
      </div>
    );
  }
}

//export default HexEditMenu;

// Decorate the form component
HexEditMenu = reduxForm({
  form: 'hexeditform' // a unique name for this form
})(HexEditMenu);

export default HexEditMenu;

/*export default HexEditMenu({
  form: 'hexeditform'  // a unique identifier for this form
})(HexEditMenu)*/