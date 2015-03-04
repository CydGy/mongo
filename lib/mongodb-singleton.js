/**
 * Modules dependencies
 */

var MongoClient = require('mongodb').MongoClient;


/**
 * @param {String} host
 * @param {Number} port
 * @param {String} dbName
 * @param {Array} collectionsNames
 *
 * @returns {Function} The function each file calls for its own connection.
 */

module.exports = function (host, port, dbName, collectionsNames) {

  var databases = {};

  return function (callback) {

    if (databases[dbName]) return callback(null, databases[dbName]);

    host = host || '127.0.0.1';
    port = port || 27017;

    MongoClient.connect('mongodb://' + host + ':' + port + '/' + dbName,
    function (err, db) {
      if (err) return callback(err);

      databases[dbName] = {};

      db.on('close', function () {
        delete databases[dbName];
      });

      for (var i = 0; i < collectionsNames.length; i++) {
        databases[dbName][collectionsNames[i]] =
          db.collection(collectionsNames[i]);
      }

      callback(null, databases[dbName]);

    });

  };

};
