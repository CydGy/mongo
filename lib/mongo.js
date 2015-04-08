/**
 * Modules dependencies
 */

var MongoClient = require('mongodb').MongoClient;


var dbs = {};
var queue = [];
var lock;


/**
 * @param {String} id
 * @param {String} host
 * @param {Number} port
 * @param {String} dbName
 * @param {Array} collectionsNames
 * @param {Function} callback
 */

function set (id, host, port, dbName, collectionsNames, callback) {

  // do nothing if already exists
  if (dbs[id]) return;

  lock = true;

  MongoClient.connect('mongodb://' + host + ':' + port + '/' + dbName,
  function (err, db) {
    if (err) return callback(err);

    dbs[id] = {
      db: db
    };

    // removing when it closes
    db.on('close', function () {
      delete dbs[id];
    });

    // opening all collections
    for (var i = 0; i < collectionsNames.length; i++) {
      dbs[id][collectionsNames[i]] =
        db.collection(collectionsNames[i]);
    }

    lock = false;
    callback();
    doQueue();

  });

}


/**
 * @param {String} id
 * @param {Function} callback (used for queue)
 */

function get (id, callback) {

  if (lock) {
    queue.push({id: id, callback: callback});
  } else {
    if (dbs[id]) return callback(null, dbs[id]);
    else return callback(new Error('Getting unexisting reference.'));
  }

}


function doQueue () {
  for (var i = 0; i < queue.length; i++) {
    get(queue[i].id, queue[i].callback);
  }
}


exports.set = set;
exports.get = get;
