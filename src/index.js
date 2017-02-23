var makeStore require('./store.js');
var startServer require('./src/server');

export const store = makeStore();
startServer();
