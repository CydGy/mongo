#Mongo

## API

### Example

```Javascript
var mongo = require('mongo');

// do it once
mongo.set(
  'myid',
  '127.0.0.1',
  27017,
  'mydb',
  ['users', 'admins']
function (err, mon) {
  if (err) {
    console.error(err);
    process.exit(1);
  } else {
    console.log('myid has been set');
  }
});

// put this where you want
mongo.get('myid', function (err, mon) {
  if (err) return console.error(err);
  
  mon.users.findOne({name: "Joe"}, function (err, doc) {
  });

});
```

### mongo.set(id, host, port, dbName, collectionsNames, callback)
* `id` String – The reference to your MongoDB connection.
* `host` String
* `port` Number
* `dbName` String
* `collectionsNames` Array – The list of the collections you want to open.
* `callback` Function

The callback is passed two arguments `(err, myMongoConnection)`.

### mongo.get(id, callback)
* `id` String – The reference to your MongoDB connection.
* `callback` Function

The callback is passed two arguments `(err, myMongoConnection)`.

## Installation

```Shell
npm install cydgy/mongo
```

## License

Mongo is licensed under the MIT license.
