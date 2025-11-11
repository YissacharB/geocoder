var _ = require('underscore');
var URLSearchParams = require('url').URLSearchParams;

var fetchFn = typeof globalThis.fetch === 'function' ? globalThis.fetch.bind(globalThis) : null;

function buildUrl(base, params) {
  var searchParams = new URLSearchParams();

  _.each(params || {}, function (value, key) {
    if (value === undefined || value === null) {
      return;
    }

    if (Array.isArray(value)) {
      value.forEach(function (entry) {
        if (entry !== undefined && entry !== null) {
          searchParams.append(key, entry);
        }
      });
    } else {
      searchParams.append(key, value);
    }
  });

  var query = searchParams.toString();
  return query ? base + '?' + query : base;
}

module.exports = {
  fetchFn: fetchFn,
  buildUrl: buildUrl
};
