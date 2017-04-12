import config from './initial.json';
import {Iterable, fromJS, List, Map,is} from 'immutable';

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
  let remove = function(curr, target){
    return curr.delete(curr.findIndex(function(elem){
      //2D content array check
      if(Iterable.isIterable(elem)){
        return is(elem, List(target));
      }
      else {
        return is(elem, target);
      }
    }));
  }
  if(state.getIn(["collections",collect,"layout"])==="free" && prop==="content" && op==="chg"){
    //misc represents the actual target that needs to change, remove it and add the new val(pos)
    return state.updateIn(
      ["collections", collect, prop],
      0,
      content => remove(content, misc).push(List(val)));
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
        content => remove(content, val));
    }
    //Replace list, mainly for re-ordering
    else {
      return state.updateIn(
        ["collections", collect, prop],
        0,
        content => val);
    }
  }
}
