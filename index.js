'use strict'

var _ = require('lodash')
var through2 = require('through2')
var standard = require('standard')
var standardFormat = require('standard-format')
var gutil = require('gulp-util')
var PLUGIN_NAME = require('./package.json').name

var GulpStandardDest = {}

GulpStandardDest.Linter = function (standardInstance, standardOpts) {
  var validStandardInstance = standard
  if (!_.isUndefined(standardInstance) && _.isFunction(standardInstance.lintText)) {
    validStandardInstance = standardInstance
  }

  var validStandardOpts = {}
  if (!_.isUndefined(standardOpts) && _.isPlainObject(standardOpts)) {
    validStandardOpts = standardOpts
  }

  return through2.obj(
    function (file, enc, callback) {
      if (file.isNull() || file.isStream()) {
        file.standard = { skipped: true }
        return callback(null, file)
      }

      validStandardInstance.lintText(String(file.contents), validStandardOpts,
        function (err, data) {
          file.standard = !_.isUndefined(data) && _.isPlainObject(data) ? data : { skipped: true }
          callback(err, file)
        }
      )
    }
  )
}
GulpStandardDest.linter = GulpStandardDest.Linter

GulpStandardDest.Linter.Reporter = function (reporter, opts) {
  var reporterInstance = {}
  if (_.isString(reporter)) {
    try {
      reporterInstance = require('./reporters/linter/' + reporter)(opts)
    } catch (err) {
      try {
        reporterInstance = require(reporter)(opts)
      } catch (err) {
        reporterInstance = undefined
      }
    }
  } else if (_.isFunction(reporter)) {
    reporterInstance = reporter(opts)
  }

  return reporterInstance
}
GulpStandardDest.Linter.reporter = GulpStandardDest.Linter.Reporter

GulpStandardDest.Formatter = function (standardFormatInstance) {
  var validStandardFormatInstance = standardFormat
  if (!_.isUndefined(standardFormatInstance)) {
    validStandardFormatInstance = standardFormatInstance
  }

  return through2.obj(
    function (file, enc, callback) {
      if (file.isNull()) {
        return callback(null, file)
      }

      if (file.isStream()) {
        return callback(new gutil.PluginError(PLUGIN_NAME, 'Streams are not supported!'), file)
      }

      if (file.isBuffer()) {
        var formatted = validStandardFormatInstance.transform(file.contents.toString())
        file.contents = new Buffer(formatted)
      }

      return callback(null, file)
    }
  )
}
GulpStandardDest.formatter = GulpStandardDest.Formatter

GulpStandardDest.Formatter.Reporter = function (reporter, opts) {
  var reporterInstance = {}
  if (_.isString(reporter)) {
    try {
      reporterInstance = require('./reporters/formatter/' + reporter)(opts)
    } catch (err) {
      try {
        reporterInstance = require(reporter)(opts)
      } catch (err) {
        reporterInstance = undefined
      }
    }
  } else if (_.isFunction(reporter)) {
    reporterInstance = reporter(opts)
  }

  return reporterInstance
}
GulpStandardDest.Formatter.reporter = GulpStandardDest.Formatter.Reporter

module.exports = GulpStandardDest
