import React from 'react';
import ReactDOM from 'react-dom';
import './css/normalize.css';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import {Provider} from 'react-redux';
import {createStore, combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';

const initialState = {
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

function hexReducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state
  }
}

const rootReducer = combineReducers({
  hex: hexReducer,
  form: formReducer
});

const store = createStore(rootReducer);

/*function reducer() {
  return {
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
}

const store = createStore(reducer);*/

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
