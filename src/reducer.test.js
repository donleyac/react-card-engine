import {fromJS, List, Map} from 'immutable';
import config from './initial.json';
import reducer from '../src/reducer';

test('handle NoInitialState', () => {
  const state = Map(fromJS(config));
  const action = {action:'COLLECTIONS',collection:"board_both", property:"content", value:"cardId22",op:"rm",type:"card"}
  const nextState = reducer(undefined, action);
  expect(state).toEqual(nextState);
});

test('handle Indicators', () => {
  const initialState = Map(fromJS({
    "playersById":{
      "you": {
        "name": "Alex",
        "indicators": {
          "health": 30,
          "attack": 0,
        }
      }
    }
  }));
  const action = {action: 'INDICATORS', playerId: "you", indicator: "health", modifier: -1};
  const nextState = reducer(initialState, action);
  expect(nextState).toEqual(Map({
    "playersById": Map({
      "you":Map({
        "name": "Alex",
        "indicators": Map({
          "health": 29,
          "attack": 0,
        })
      })
    })
  }));
});

test('handle Collection - Stacked', () => {
  const initialState = Map(fromJS({
    "collections": {
      "hand_you": {
        "id": "hash1",
        "content": ["cardId1", "cardId2","cardId3"],
        "visibility": ["you"],
        "control": ["you"],
        "layout":"stacked"
      }
    }
  }));
  const action = {action: 'COLLECTIONS', collection: "hand_you", property: "control", value: List.of("you","opponent")};
  const nextState = reducer(initialState, action);
  expect(nextState).toEqual(Map(fromJS({
    "collections": {
      "hand_you": {
        "id": "hash1",
        "content": ["cardId1", "cardId2","cardId3"],
        "visibility": ["you"],
        "control": ["you","opponent"],
        "layout":"stacked"
      }
    }
  })));
});
test('handle Collection - Free', () => {
  const initialState = Map(fromJS({
    "collections": {
      "board_both": {
        "content": [["card","cardId1","x","y","angle"],
          ["card","cardId2","x","y","angle"],
          ["card","cardId3","x","y","angle"],
          ["counter","counterId1","x","y","angle"]],
        "visibility": ["you", "opponent"],
        "control": ["you", "opponent"],
        "layout": "free"
      }
    }
  }));
  const action = {action:'COLLECTIONS',collection:"board_both", property:"content", value:"cardId3",op:"rm",type:"card"}
  const nextState = reducer(initialState, action);
  expect(nextState).toEqual(Map(fromJS({
    "collections": {
      "board_both": {
        "content": [["card","cardId1","x","y","angle"],
          ["card","cardId2","x","y","angle"],
          ["counter","counterId1","x","y","angle"]],
        "visibility": ["you", "opponent"],
        "control": ["you", "opponent"],
        "layout": "free"
      }
    }
  })));
});
