#Mongo

## API

```Javascript
var mongo = require('mongo');

// do it once
mongo.set(
  'myid',
  '127.0.0.1',
  27017,
  'mydb',
  ['users', 'admins']
);

// put this where you want
mongo.get('myid', function (err, mon) {
  if (err) return console.error(err);
  
  mon.users.findOne({name: "Joe"}, function (err, doc) {
  });

});
```

## License

Mongo is licensed under the MIT license.
