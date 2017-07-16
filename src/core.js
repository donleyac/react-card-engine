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
export function modCollection(state, collect, prop, val, op){
  //need to cast val to immutable for add and comparisons
  if(val instanceof Array){
    val = List(val);
  }
  let findIndex = function(curr,target){
    return curr.findIndex(function(elem){
      if(Iterable.isIterable(elem)){
        return is(elem.get(5), target.get(5));
      }
      else {
        return is(elem, target);
      }
    })
  }
  let remove = function(curr, target){
    return curr.delete(findIndex(curr,target));
  }
  //TODO Method is already generic, may be able to work with just a unique operation
  if(state.getIn(["collections",collect,"layout"])==="free" && prop==="content" && op==="chg"){
    return state.updateIn(
      ["collections", collect, prop],
      0,
      content => content.set(findIndex(content, val), val));
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
