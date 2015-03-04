#Mongo

## API

```Javascript
var mongo = require('mongodb-singleton')(
  '127.0.0.1',
  27017,
  'mywebsite',
  ['users', 'admins']
);

mongo(function (err, collections) {

  collections.users.findOne({}, function (err, doc) {

  });

});
```

## License

Mongo is licensed under the MIT license.
