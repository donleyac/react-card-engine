import makeStore from './store';
import {startServer} from './server';

export const store = makeStore();
startServer(store);

store.dispatch({type: 'INITIAL_STATE'});
