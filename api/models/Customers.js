/**
* Customers.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/
var bcrypt = require('bcrypt');

var tablize = require('sd-datatables');

module.exports = {

  attributes: {
    email: {
      type: 'string',
      required: true
		},
    username: {
      type: 'string',
      required: true
		},
    password: {
      type: 'string',
      required: true
		},
  },

  beforeCreate: function(attrs, next) {
    var onSalt = bcrypt.genSaltAsync(10);

    onSalt.then(function(salt) {
      var onHash = bcrypt.hashAsync(attrs.password, salt);
      onHash.then(function(hash) {
        attrs.password = hash;
        next();

      }).catch(function(err) {
        return next(err);
      });

    }).catch(function(err) {
      return next(err);
    });
  }

};

tablize(module.exports);

