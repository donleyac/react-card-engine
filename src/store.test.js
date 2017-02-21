import {Map, fromJS} from 'immutable';
import config from './initial.json';
import makeStore from '../src/store';

test('store', () => {
  const store = makeStore();
  expect(store.getState()).toEqual(fromJS(config));

  store.dispatch({type:"INITIAL_STATE"});
  expect(store.getState()).toEqual(fromJS(config));
});
