/*
 * download-builder.js: Top-level include for jQuery UI download builder
 *
 * (C) 2011 Charlie Robbins and jQuery UI contributors
 * MIT LICENCE
 *
 */
 
var builder = exports;

builder.Build      = require('./download-builder/build').Build;
builder.Dependency = require('./download-builder/dependency').Dependency;
builder.minify     = require('./download-builder/minify');
builder.package    = require('./download-builder/package');