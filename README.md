# auto-page

Automatically combine paginated api calls.

Like this:
```
var autopage = require('auto-page');

autopage(function(pageNumber, cb) {
  cb(null, // any error
    {
      body: [],
      header: {}
    });
}, function(err, result) {
  // use the result
});
```

Also returns Q promises:
```
var autopage = require('auto-page');

autopage(function(pageNumber, cb) {
  cb(null, // any error
    {
      body: [],
      header: {}
    });
}).then(function(result) {
  // use the result
});
```

## Contributing
1. `npm install`
2. ????
3. `npm test`
