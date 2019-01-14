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
  switch (action.type) {
    case "HEX_CLICKED":
      console.log("received HEX_CLICKED action");
      console.log("action content: " + JSON.stringify(action));
      //return action.key.toString();
      return Object.assign({}, state, {
        selectedHexKey: action.key.toString()
        })
    default:
      return state
  }
}

function hexReducer(state = hexesInitialState, action) {
  switch (action.type) {
    case "ADD_HEX":
      console.log("received ADD_HEX action");
      console.log("action content: " + JSON.stringify(action));
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

export default store;