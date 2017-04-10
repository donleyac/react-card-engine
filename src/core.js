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
      // 0,
      indicator => indicator + value
    );
  }
}
export function modCollection(state, collection, property, value, op, category){

  let remove = function(list, category )

  //content is added or removed from a list 1-by-one
  if (property ==="content"){
    // Stacked has different content structure than free
    if(state.getIn(["collections",collection,"layout"])==="stacked"){
      if(op==="add") {
        return state.updateIn(
          ["collections", collection , property],
          0,
          content => content.push(value)
        );
      }
      else if(op==="rm"){
        return state.updateIn(
          ["collections", collection , property],
          0,
          content => content.filter(elem => elem!=value)
        );
      }
      //replace
      else {
        return state.updateIn(
          ["collections", collection , property],
          0,
          content => value
        );
      }
    }
    //not stacked
    else {
      if(op==="add"){
        return state.updateIn(
          ["collections", collection , property],
          0,
          content => content.push(value)
        );
      }
      //Todo fix so that it doesnt remove all references to that element
      else if(op==="rm"){
        return state.updateIn(
          ["collections", collection , property],
          0,
          content => content.filter(row => (row.get(0)!=category || row.get(1)!=value))
        );
      }
      //replace
      else {
        return state.updateIn(
          ["collections", collection , property],
          0,
          content => value
        );
      }
    }
  }
  //If not content, simply replace array
  return state.updateIn(
    ["collections", collection , property],
    0,
    current=>value
  );
}
