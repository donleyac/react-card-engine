import makeStore from './store.js'
import startServer from './src/server';

export const store = makeStore();
startServer();
