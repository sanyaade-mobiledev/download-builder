/*
 * package.js: Utilities for working with jQuery UI build packages.
 *
 * (C) 2011 Charlie Robbins and jQuery UI contributors
 * MIT LICENCE
 *
 */
 
var fs = require('fs'),
    path = require('path'),
    request = require('request');
 
var package = exports;

package.download = function (repo, callback) {
  
};

package.read = function (file, callback) {
  console.log(file);
  fs.stat(file, function (err, stats) {
    if (err) {
      return callback(err);
    }
    
    if (stats.isDirectory()) {
      file = path.join(file, 'package.json');
    }
    
    fs.readFile(file, 'utf8', function (err, data) {
      if (err) {
        return callback(err);
      }
      
      try {
        data = JSON.parse(data);
        return callback(null, data);
      }
      catch (ex) {
        return callback(ex);
      }
    });
  });
};