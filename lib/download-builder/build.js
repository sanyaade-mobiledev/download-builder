/*
 * build.js: Combined state for a single jQuery UI build process. 
 *
 * (C) 2011 Charlie Robbins and jQuery UI contributors
 * MIT LICENCE
 *
 */
 
var flatiron = require('flatiron'),
    async = flatiron.common.async,
    dependency = require('./dependency');
    package = require('./package');

var Build = exports.Build = function Build (options) {
  flatiron.App.call(this, options);
  
  this.dependencies = []
};

//
// Inherit from `flatiron.App`. This is just 
// `require('util').inherits` wrapped by flatiron.
//
flatiron.common.inherits(Build, flatiron.App);

Build.prototype.start = function (callback) {
  var self = this;
  this.init(function (err) {
    if (err) {
      return callback(err);
    }
    
    self.read(function (err) {
      return err ? callback(err) : self.build(callback);
    });
  });
};

Build.prototype.build = function (callback) {
  var self = this;
  
  if (!this.package || !this.package.dependencies) {
    return callback(new Error('No package.json or dependencies found.'));
  }
  
  function buildDep (key, next) {
    var repo = self.package.dependencies[key],
        dep = new dependency.Dependency({ repository: dep });
    
    self.dependencies.push(dep);
    dep.build(next);
  }
  
  async.forEach(Object.keys(this.package.dependencies), buildDep, callback);
};

Build.prototype.read = function (callback) {
  var self = this;
  package.read(this.root, function (err, pkg) {
    if (err) {
      return callback(err);
    }
    
    self.package = pkg;
    callback();
  });
};