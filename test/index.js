var autopage = require('..');
var assert = require('assert');

describe('auto-page', function() {
  it('handles an empty page', function(done) {
    var func = function(number, cb) {
      var page = {
        body: [],
        header: {}
      };
      cb(null, page);
    };
    autopage(func, function(err, result) {
      assert.equal(result.length, 0);
      done();
    });
  });

  it('handles an one page', function(done) {
    var func = function(number, cb) {
      var page = {
        body: ['hello'],
        header: {}
      };
      cb(null, page);
    };
    autopage(func, function(err, result) {
      assert.equal(result.length, 1);
      assert.equal(result[0], 'hello');
      done();
    });
  });

  it('combines two pages', function(done) {
    var func = function(number, cb) {
      if(number === 1) {
        cb(null, {
          body: ['1'],
          header: {
            link: '<https://api.website.com/resource?page=2>; rel="last"'
          }
        });
      } else {
        cb(null, {
          body: ['2'],
          header: {}
        });
      }
    };

    autopage(func, function(err, result) {
      assert.equal(result.length, 2);
      assert.equal(result[0], 1);
      assert.equal(result[1], 2);
      done();
    });
  });
});
