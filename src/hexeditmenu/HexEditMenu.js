import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import './HexEditMenu.css';

class HexEditMenu extends Component {
  componentWillMount () {
    this.props.initialize({ terrain: 'plains' });
  }
  
  render() {
    const { handleSubmit } = this.props;
    return (
      <div className="HexEditMenu">
        <div className="form-horizontal" id="hex-edit-form">
          <Field className="form-control" name="x" component="input" type="number" placeholder="x"/>
          
          <Field className="form-control" name="y" component="input" type="number" placeholder="y"/>
          
          <Field className="form-control" name="terrain" component="select">
            <option value="plains">Plains</option>
            <option value="hills">Hills</option>
            <option value="forest">Forest</option>
            <option value="swamp">Swamp</option>
            <option value="mountain">Mountain</option>
          </Field>
          
          <button onClick={handleSubmit(values => 
            this.props.onSubmit({ 
              ...values,
              pill: 'blue'
            }))}>Blue Pill</button>
            
          <button onClick={handleSubmit(values => 
            this.props.onSubmit({ 
              ...values,
              pill: 'red'
            }))}>Red Pill</button>
          
          
          
          
            
          <button type="submit" id="add-hex-btn" className="btn btn-primary"
            onClick={handleSubmit(values => 
              this.props.onSubmit({ 
                ...values,
                action: 'ADD_HEX'
              }))}
          >Add Hex</button>

          <div id="add-hexes-message"></div>

          <button type="submit" id="save-map-btn" className="btn btn-success"
            onClick={handleSubmit(values => 
              this.props.onSubmit({ 
                ...values,
                action: 'SAVE_MAP'
              }))}
          >Save Map Data</button>
          
          <button type="submit" id="load-map-btn" className="btn btn-warning"
            onClick={handleSubmit(values => 
              this.props.onSubmit({ 
                ...values,
                action: 'LOAD_MAP'
              }))}
          >Load Map</button>
          
          <button type="submit" id="delete-hexes-btn" className="btn btn-danger"
            onClick={handleSubmit(values => 
              this.props.onSubmit({ 
                ...values,
                action: 'DELETE_HEX'
              }))}
          >Delete Hex</button>
          
          <button type="submit" id="clear-map-btn" className="btn btn-danger"
            onClick={handleSubmit(values => 
              this.props.onSubmit({ 
                ...values,
                action: 'CLEAR_MAP'
              }))}
          >Clear Map</button>
          
          <button type="submit" id="clear-save-btn" className="btn btn-danger"
            onClick={handleSubmit(values => 
              this.props.onSubmit({ 
                ...values,
                action: 'CLEAR_SAVE'
              }))}
          >Clear Save Data</button>
        </div>
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