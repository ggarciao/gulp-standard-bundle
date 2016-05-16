'use strict'

var _ = require('lodash')
var through2 = require('through2')
var standard = require('standard')
var gutil = require('gulp-util')
var PLUGIN_NAME = require('./package.json').name

var GulpStandardDest = function (standardInstance, standardOpts) {
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

GulpStandardDest.reporter = function (reporter, opts) {
  var reporterInstance = {}
  if (_.isString(reporter)) {
    try {
      reporterInstance = require('./reporters/' + reporter)(opts)
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

module.exports = GulpStandardDest
