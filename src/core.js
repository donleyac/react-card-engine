import config from './initial.json';
export function getInitial() {
  return config;
}
export function modIndicator(state, playerId, indicator, modifier){
  return state.updateIn(
    ["playersById",playerId, 'indicators', indicator],
    0,
    indicator => indicator + modifier
  );
}
export function modCollection(state, collection, property, value, op, type){
  //content is added or removed from a list 1-by-one
  if (property ==="content"){
    //Stacked has different content structure than free
    if(state.getIn(["playersById","collections",collection,"layout"])==="stacked"){
      return state.updateIn(
        ["playersById","collections", collection , property],
        0,
        (op==="add")? content => content.push(value): content => content.filter(elem => elem!=value)
      );
    }
    else {
      return state.updateIn(
        ["playersById","collections", collection , property],
        0,
        (op==="add")? content => content.push(value): content => content.filter(row => (row.get(0)!=type || row.get(1)!=value))
      );
    }
  }
  //visibility and control is a ui-checkbox and returns a new list
  return state.updateIn(
    ["playersById","collections", collection , property],
    0,
    current=>value
  );
}
