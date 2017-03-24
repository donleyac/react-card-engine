import config from './initial.json';
import {fromJS, List, Map} from 'immutable';

export const INITIAL_STATE = getInitial();
export function getInitial() {
  return Map(fromJS(config));
}
export function modIndicator(state, playerId, indicator, modifier){
  return state.updateIn(
    ["playersById",playerId, 'indicators', indicator],
    0,
    indicator => indicator + modifier
  );
}
export function modCollection(state, collection, property, value, op, category){
  //content is added or removed from a list 1-by-one
  if (property ==="content"){
    //Stacked has different content structure than free
    if(state.getIn(["collections",collection,"layout"])==="stacked"){
      return state.updateIn(
        ["collections", collection , property],
        0,
        (op==="add")? content => content.push(value): content => content.filter(elem => elem!=value)
      );
    }
    else {
      return state.updateIn(
        ["collections", collection , property],
        0,
        (op==="add")? content => content.push(value): content => content.filter(row => (row.get(0)!=category || row.get(1)!=value))
      );
    }
  }
  //visibility and control is a ui-checkbox and returns a new list
  return state.updateIn(
    ["collections", collection , property],
    0,
    current=>value
  );
}
