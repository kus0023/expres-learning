const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const URL = "mongodb://localhost:27017/codeial_dev";

const store = new MongoDBStore({
    uri: URL,
    collection: 'mySessions'
  });

store.on('error', function(error) {
console.log(error);
});

module.exports = store;