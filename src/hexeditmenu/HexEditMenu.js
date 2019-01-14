import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import './HexEditMenu.css';

class HexEditMenu extends Component {
  componentWillMount () {
    
  }
  
  renderField = ({ input, placeholder, label, type, meta: { touched, error } }) => (
      <div>
        <input {...input} placeholder={placeholder} type={type} className="form-control" />
        {touched && error && <span className="error">{error}</span>}
      </div>
  )

  render() {
    const { handleSubmit, error } = this.props;
    return (
      <div className="HexEditMenu">
        <div className="form-horizontal" id="hex-edit-form">
          <Field
            name="x"
            type="number"
            component={this.renderField}
            placeholder="x"
          />
          
          <Field
            name="y"
            type="number"
            component={this.renderField}
            placeholder="y"
          />
          
          <Field className="form-control" name="terrain" component="select">
            <option value="plains">Plains</option>
            <option value="hills">Hills</option>
            <option value="forest">Forest</option>
            <option value="swamp">Swamp</option>
            <option value="mountain">Mountain</option>
          </Field>
          
          {error && <div><span className="error"><strong>{error}</strong></span></div>}
          
          <button type="submit" id="add-hex-btn" className="btn btn-primary"
            onClick={handleSubmit(values => 
              this.props.onSubmit({ 
                ...values,
                action: 'ADD_HEX'
              }))}
          >Add Hex</button>
          
          <button type="submit" id="delete-hexes-btn" className="btn btn-danger"
            onClick={handleSubmit(values => 
              this.props.onSubmit({ 
                ...values,
                action: 'DELETE_HEX'
              }))}
          >Delete Hex</button>

          <button type="submit" id="save-map-btn" className="btn btn-success"
            onClick={handleSubmit(values => 
              this.props.onSubmit({ 
                ...values,
                action: 'SAVE_MAP'
              }))}
          >Save Map</button>
          
          <button type="submit" id="load-map-btn" className="btn btn-warning"
            onClick={handleSubmit(values => 
              this.props.onSubmit({ 
                ...values,
                action: 'LOAD_MAP'
              }))}
          >Load Map</button>

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
          >Clear Save</button>
        </div>
      </div>
    );
  }
}

// Decorate the form component
HexEditMenu = reduxForm({
  form: 'hexeditform'
})(HexEditMenu);


export default connect(function(state){
  let initialHex = state.hexes.hexes.find(hex => hex.key === state.ui.selectedHexKey);
  let initialValues;
  if (initialHex) {
    initialValues = {
      x: initialHex.x.toString(),
      y: initialHex.y.toString(),
      terrain: initialHex.terrain,
    }
  } else {
    initialValues = {
      x: "0",
      y: "0",
      terrain: "plains",
    }
  }
  return {
    initialValues: initialValues,
    enableReinitialize: true,
  }
})(HexEditMenu);