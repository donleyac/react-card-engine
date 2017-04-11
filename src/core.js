import config from './initial.json';
import {fromJS, List, Map} from 'immutable';

export const INITIAL_STATE = getInitial();
export function getInitial() {
  return Map(fromJS(config));
}
export function modIndicator(state, playerId, label, value, op){
  if (op==="replace"){
    return state.updateIn(
      ["playersById",playerId, 'indicators', label],
      0,
      indicator => value
    );
  }
  else {
    return state.updateIn(
      ["playersById",playerId, 'indicators', label],
      0,
      indicator => indicator + value
    );
  }
}
export function modCollection(state, collect, prop, val, op, misc){
  if(state.getIn(["collections",collect,"layout"])==="free" && prop==="content"){
    if(op==="add"){
      return state.updateIn(
       ["collections", collect, prop],
       0,
       content => content.push(val));
    }
    else if(op==="rm"){
      return state.updateIn(
        ["collections", collection , property],
        0,
        content => content.delete(content.findIndex(val))
        // content => content.filter(row => (row.get(0)!=misc || row.get(1)!=val)));
    }
    //Replace list, mainly for re-ordering
    else {
      return state.updateIn(
        ["collections", collect, prop],
        0,
        content => val
    }
  }
  else {
    if(op==="add"){
      return state.updateIn(
       ["collections", collect, prop],
       0,
       content => content.push(val));
    }
    else if(op==="rm"){
      return state.updateIn(
        ["collections", collect, prop],
        0,
        content => content.delete(content.findIndex(val))
        // content => content.filter(elem => elem!=val));
    }
    //Replace list, mainly for re-ordering
    else {
      return state.updateIn(
        ["collections", collect, prop],
        0,
        content => val
    }
  }
}
