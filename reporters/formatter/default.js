'use strict'

var path = require('path')
var through2 = require('through2')
var gutil = require('gulp-util')
var colors = require('colors/safe')
var logSymbols = require('log-symbols')
var appRoot = require('app-root-path')
var PLUGIN_NAME = require('../../package.json').name

function Stylish (options) {
  var totalErrorCount = 0
  var totalWarningCount = 0

  // File specific reporter
  function reportFile (filepath, data) {
    var lines = []

    // Filename
    lines.push(colors.magenta.underline(path.relative(appRoot.path, filepath)))
    lines.push(logSymbols.success + ' ' + colors.green('Format OK'))

    return lines.join('\n') + '\n'
  }

  // Reporter header
  function reportHeader () {
    console.log(colors.green('Standard formatter results'))
    console.log('======================================\n')
  }

  // Reporter footer
  function reportFooter () {
    console.log(logSymbols.success + ' ' + colors.green('All OK!'))
  }

  reportHeader()

  return through2.obj(function (file, enc, cb) {
    if (file.isNull()) {
      return cb(null, file)
    }

    if (file.isStream()) {
      return cb(new gutil.PluginError(PLUGIN_NAME, 'Streams are not supported!'), file)
    }

    // Report file specific stuff only when there are some errors/warnings
    if (file.standard && (file.standard.errorCount || file.standard.warningCount)) {
      totalErrorCount += file.standard.errorCount
      totalWarningCount += file.standard.warningCount
    }
    console.log(reportFile(file.path, file.standard))

    cb(null, file)
  })
    .on('end', function () {
      reportFooter()

      // If user wants gulp to break execution on reported errors or warnings
      if (totalErrorCount && options.breakOnError) {
        this.emit('error', new gutil.PluginError(PLUGIN_NAME, 'Linter errors occurred!'))
      }
      if (totalWarningCount && options.breakOnWarning) {
        this.emit('error', new gutil.PluginError(PLUGIN_NAME, 'Linter warnings occurred!'))
      }
    })
}

module.exports = Stylish
