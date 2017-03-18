import {fromJS, List, Map} from 'immutable';
import config from '../initial.json';
import {getInitial, modIndicator, modCollection} from '../core.js';

test('Initial State', () => {
  const state = getInitial();
  expect(state).toEqual(Map(fromJS(config)));
});

test('Indicators', () => {
  const state = Map(fromJS({
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
  const nextState = modIndicator(state, "you", "health", -1);
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

test('Collections - Stacked', () => {
  const state = Map(fromJS({
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
  const nextState_ctrl = modCollection(state, "hand_you", "control", List.of("you","opponent"));
  expect(nextState_ctrl).toEqual(Map(fromJS({
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
  const nextState_content_add = modCollection(state, "hand_you", "content", "cardId4","add");
  expect(nextState_content_add).toEqual(Map(fromJS({
    "collections": {
      "hand_you": {
        "id": "hash1",
        "content": ["cardId1", "cardId2","cardId3","cardId4"],
        "visibility": ["you"],
        "control": ["you"],
        "layout":"stacked"
      }
    }
  })));
  const nextState_content_rm = modCollection(state, "hand_you", "content", "cardId3","rm");
  expect(nextState_content_rm).toEqual(Map(fromJS({
    "collections": {
      "hand_you": {
        "id": "hash1",
        "content": ["cardId1", "cardId2"],
        "visibility": ["you"],
        "control": ["you"],
        "layout":"stacked"
      }
    }
  })));
});

test('Collections - Free', () => {
  const state = Map(fromJS({
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
  const nextState_content_rm = modCollection(state, "board_both", "content", "cardId3","rm", "card");
  expect(nextState_content_rm).toEqual(Map(fromJS({
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
