'use strict'

var _ = require('lodash')
var through2 = require('through2')
var ts = require('text-stream')
var standard = require('standard')
var standardFormat = require('standard-format')
var gutil = require('gulp-util')
var PLUGIN_NAME = require('./package.json').name

var GulpStandardDest = {}

GulpStandardDest.Linter = function (standardInstance, standardOpts) {
  var validStandardOpts = {}
  if (!_.isUndefined(standardOpts) && _.isPlainObject(standardOpts)) {
    validStandardOpts = standardOpts
  }

  var validStandardInstance = standard
  if (!_.isUndefined(standardInstance)) {
    validStandardInstance = standardInstance
  }

  return through2.obj(
    function (file, enc, cb) {
      if (file.isNull()) {
        return cb(null, file)
      }

      if (file.isStream()) {
        return cb(new gutil.PluginError(PLUGIN_NAME, 'Streams are not supported!'))
      }

      validStandardInstance.lintText(String(file.contents), validStandardOpts,
        function (err, data) {
          file.standard = data
          cb(err, file)
        }
      )
    }
  )
}

GulpStandardDest.Linter.Reporter = function (reporter, opts) {
  var reporterInstance = undefined
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
GulpStandardDest.linter = GulpStandardDest.Linter

GulpStandardDest.Formatter = function (standardFormatInstance) {
  var validStandardFormatInstance = standardFormat
  if (!_.isUndefined(standardFormatInstance)) {
    validStandardFormatInstance = standardFormatInstance
  }

  return through2.obj(
    function (file, enc, callback) {
      // Do nothing if no contents
      if (file.isNull()) {
        this.push(file)
        return callback()
      }

      if (file.isStream()) {
        file.contents = file.contents
          .pipe(ts(validStandardFormatInstance.transform))
          .setEncoding('utf8')

        this.push(file)
        return callback()
      }

      // check if file.contents is a `Buffer`
      if (file.isBuffer()) {
        var formatted = validStandardFormatInstance.transform(file.contents.toString())
        file.contents = new Buffer(formatted)

        this.push(file)
      }
      return callback()
    }
  )
}

GulpStandardDest.Formatter.Reporter = function (reporter, opts) {
  var reporterInstance = undefined
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
GulpStandardDest.formatter = GulpStandardDest.Formatter

module.exports = GulpStandardDest
