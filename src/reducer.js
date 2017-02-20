import {getInitial, modIndicator, modCollection} from './core.js';
export default function reducer(state,action){
  switch(action.action) {
    case 'INDICATORS':
      return modIndicator(state, action.playerId, action.indicator, action.modifier);
    case 'COLLECTIONS':
      return modCollection(state, action.collection, action.property, action.value, action.op, action.type);
  }
  return state;
}
