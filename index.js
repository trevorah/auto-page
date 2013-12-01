var Q = require('q');
var parselinks = require('parse-links');
var url = require('url');

function getPageCount(header) {
  var lastPage = 1;
  if(header.link) {
    var links = parselinks(header.link);
    if(links.last) {
      lastPage = url.parse(links.last, true).query.page;
    }
  }
  return lastPage;
}

module.exports = function(pageRequester, callback) {

  var pageRequesterQ = Q.denodeify(pageRequester);

  return pageRequesterQ(1)
    .then(function(page) {
      var pages = [page];
      var pageCount = getPageCount(page.header);

      for(var i = 2; i <= pageCount; i++) {
        pages.push(pageRequesterQ(i));
      }

      return Q.all(pages);
    })
    .then(function(pages) {
      return pages.map(function(page) {
        return page.body;
      }).reduce(function(prevBody, currBody) {
        return prevBody.concat(currBody);
      }, []);
    })
    .nodeify(callback);
};
