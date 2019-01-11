import React from 'react';
import ReactDOM from 'react-dom';
import './css/normalize.css';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import {Provider} from 'react-redux';
import {createStore, combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';

const hexesInitialState = {
  hexes: [
    {"key": "0 0", "x": 0, "y": 0, "terrain": "plains"},
    {"key": "-1 0", "x": -1, "y": 0, "terrain": "plains"},
    {"key": "1 0", "x": 1, "y": 0, "terrain": "plains"},
    {"key": "0 -1", "x": 0, "y": -1, "terrain": "forest"},
    {"key": "-1 -1", "x": -1, "y": -1, "terrain": "swamp"},
    {"key": "0 1", "x": 0, "y": 1, "terrain": "hills"},
    {"key": "-1 1", "x": -1, "y": 1, "terrain": "mountain"},
  ]
};

const uiInitialState = {
  selectedHexKey: "0 0"
}

function uiReducer (state=uiInitialState, action) {
  return state
}

function hexReducer(state = hexesInitialState, action) {
  switch (action.type) {
    case "ADD_HEX":
      console.log("received ADD_HEX action");
      console.log("action content: " + JSON.stringify(action));
      //return { ...state, {"key": action.x + " " + action.y, "x": action.x, "y": action.y, "terrain": action.terrain  }}
      if (state.hexes.find(hex => hex.key === action.x + " " + action.y)) {
        alert("this hex already exists");
        return state
      } else {
        return Object.assign({}, state, {
          hexes: [
            ...state.hexes,
            {
              "key": action.x + " " + action.y, "x": action.x, "y": action.y, "terrain": action.terrain
            }
          ]
        })
      }
    case "DELETE_HEX":
      console.log("received DELETE_HEX action");
      console.log("action content: " + JSON.stringify(action));
      //return { ...state, {"key": action.x + " " + action.y, "x": action.x, "y": action.y, "terrain": action.terrain  }}
      if (!state.hexes.find(hex => hex.key === action.x + " " + action.y)) {
        alert("no such hex found");
        return state
      } else {
        let delete_key = action.x + " " + action.y;
        return {hexes: state.hexes.filter(({key}) => key !== delete_key)}
      }
    default:
      return state
  }
}

const rootReducer = combineReducers({
  hexes: hexReducer,
  form: formReducer,
  ui: uiReducer
});

const store = createStore(rootReducer);

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
