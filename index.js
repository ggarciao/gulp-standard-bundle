'use strict'

var _ = require('lodash')
var through2 = require('through2')
var standard = require('standard')
var standardFormat = require('standard-format')
var gutil = require('gulp-util')
var PLUGIN_NAME = require('./package.json').name

var GulpStandardBundle = {}

GulpStandardBundle.Linter = function (standardInstance, standardOpts) {
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
GulpStandardBundle.linter = GulpStandardBundle.Linter

GulpStandardBundle.Linter.Reporter = function (reporter, opts) {
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
GulpStandardBundle.Linter.reporter = GulpStandardBundle.Linter.Reporter

GulpStandardBundle.Formatter = function (standardFormatInstance) {
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
GulpStandardBundle.formatter = GulpStandardBundle.Formatter

GulpStandardBundle.Formatter.Reporter = function (reporter, opts) {
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
GulpStandardBundle.Formatter.reporter = GulpStandardBundle.Formatter.Reporter

module.exports = GulpStandardBundle
