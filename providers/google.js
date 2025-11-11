var _ = require('underscore');
var utils = require('./utils');

exports.geocode = function ( providerOpts, loc, cbk, opts ) {

  var options = _.extend({sensor: false, address: loc}, opts || {});
  var uri = "http" + ( options.key ? "s" : "" ) + "://maps.googleapis.com/maps/api/geocode/json";
  if (!utils.fetchFn) {
    return cbk(new Error('Fetch API is not available in this environment. Please use Node.js 18 or later.'));
  }

  var url = utils.buildUrl(uri, options);

  utils.fetchFn(url)
    .then(function (response) {
      if (!response.ok) {
        throw new Error('Request failed with status ' + response.status + ' ' + response.statusText);
      }
      return response.json();
    })
    .then(function (result) {
      cbk(null, result);
    })
    .catch(function (err) {
      cbk(err);
    });
};

exports.reverseGeocode = function ( providerOpts, lat, lng, cbk, opts ) {

  var options = _.extend({sensor: false, latlng: lat + ',' + lng}, opts || {});
  var uri = "http" + ( options.key ? "s" : "" ) + "://maps.googleapis.com/maps/api/geocode/json";

  if (!utils.fetchFn) {
    return cbk(new Error('Fetch API is not available in this environment. Please use Node.js 18 or later.'));
  }

  var url = utils.buildUrl(uri, options);

  utils.fetchFn(url)
    .then(function (response) {
      if (!response.ok) {
        throw new Error('Request failed with status ' + response.status + ' ' + response.statusText);
      }
      return response.json();
    })
    .then(function (result) {
      cbk(null, result);
    })
    .catch(function (err) {
      cbk(err);
    });

};
