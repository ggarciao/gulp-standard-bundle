'use strict'

var _ = require('lodash')
var through2 = require('through2')
var standard = require('standard')
var gutil = require('gulp-util')
var PLUGIN_NAME = require('./package.json').name
var defaultReporter = require('./reporters/stylish')

var GulpStandardDest = function (standardInstance, standardOpts) {
  var validStandardOpts = {}
  if (!_.isUndefined(standardOpts) && _.isPlainObject(standardOpts)) {
    validStandardOpts = standardOpts
  }

  var validStandardInstance = standard
  if (!_.isUndefined(standardInstance)) {
    validStandardInstance = standardInstance
  }

  var _processFile = function (file, enc, cb) {
    if (file.isNull()) {
      return cb(null, file)
    }

    if (file.isStream()) {
      return cb(new gutil.PluginError(PLUGIN_NAME, 'Streams are not supported!'))
    }

    validStandardInstance.lintText(String(file.contents), validStandardOpts, function (err, data) {
      if (err) {
        return cb(err)
      }
      file.standard = data
      cb(null, file)
    })
  }

  return through2.obj(_processFile)
}

GulpStandardDest.reporter = function (reporter, opts) {
  if (reporter === 'default') return defaultReporter(opts)

  if (_.isFunction(reporter)) return reporter(opts)

  if (_.isString(reporter)) {
    try {
      return require('gulp-standard/reporters/' + reporter)(opts)
    } catch (err) {
      try {
        return require(reporter)(opts)
      } catch (err) {}
    }
  }

  return undefined
}

module.exports = GulpStandardDest
