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
      return Object.assign({}, state, {
        selectedHexKey: action.key.toString()
        })
    default:
      return state
  }
}

function hexReducer(state = hexesInitialState, action) {
  const localstorageKey='globalMap';
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
    case "SAVE_MAP":
      console.log("received SAVE_MAP action");
      console.log("action content: " + JSON.stringify(action));
      localStorage[localstorageKey] = JSON.stringify(state);
      return state
    case "LOAD_MAP":
      console.log("received LOAD_MAP action");
      console.log("action content: " + JSON.stringify(action));
      if(localStorage[localstorageKey]) {
        return {hexes: JSON.parse(localStorage[localstorageKey]).hexes}
      } else {
        console.log('no save found');
        return state
      }
    case "CLEAR_MAP":
      console.log("received CLEAR_MAP action");
      console.log("action content: " + JSON.stringify(action));
      return {hexes: []}
    case "CLEAR_SAVE":
      console.log("received CLEAR_SAVE action");
      console.log("action content: " + JSON.stringify(action));
      if(localStorage[localstorageKey]) {
        localStorage.removeItem(localstorageKey);
      } else {
        console.log('no save found');
      }
      return state
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