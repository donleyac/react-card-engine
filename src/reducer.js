import {getInitial, modIndicator, modCollection, INITIAL_STATE} from './core.js';
export default function reducer(state = INITIAL_STATE,action){
  switch(action.action) {
    case 'INITIAL_STATE':
      return getInitial();
    case 'INDICATORS':
      return modIndicator(state, action.playerId, action.indicator, action.modifier);
    case 'COLLECTIONS':
      return modCollection(state, action.collection, action.property, action.value, action.op, action.type);
  }
  return state;
}
