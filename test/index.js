/* globals it, describe */

var fs = require('fs')

var gutil = require('gulp-util')
gutil.Noop = gutil.noop

var linter = require('../').Linter

var expect = require('chai').expect

var testFile1 = fs.readFileSync('test/data/testFile1.js')

describe('gulp-standard-dest', function () {
  var _lintFunction = function (instance, options, done) {
    var stream = linter(instance, options)
    var fakeFile = new gutil.File({
      base: 'test/data',
      cwd: 'test/',
      path: 'test/data/testFile1.js',
      contents: testFile1
    })
    stream.once('data', function (newFile) {
      expect(newFile).to.exist
      expect(newFile.standard).to.exist
      expect(newFile.standard.skipped).to.not.be.ok
      expect(newFile.standard.results[0].messages[0].message).to.be.equal("Expected '===' and instead saw '=='.")
      done()
    })
    stream.write(fakeFile)
    stream.end()
  }

  var _lintNullOrStreamFunction = function (content, done) {
    var stream = linter()
    var fakeFile = new gutil.File({
      base: 'test/data',
      cwd: 'test/',
      path: 'test/data/testFile1.js',
      contents: content
    })
    stream.once('data', function (newFile) {
      expect(newFile).to.exist
      expect(newFile.standard).to.exist
      expect(newFile).to.exist
      expect(newFile.standard.skipped).to.be.ok
      done()
    })
    stream.write(fakeFile)
    stream.end()
  }

  it('Lint with standard instance', function (done) {
    _lintFunction(undefined, undefined, done)
  })
  it('Lint with standard instance and given options', function (done) {
    _lintFunction(undefined, {}, done)
  })
  it('Lint with given instance', function (done) {
    _lintFunction(require('standard'), undefined, done)
  })
  it('Lint with given instance and given options', function (done) {
    _lintFunction(require('standard'), {}, done)
  })
  it('Lint with invalid instance', function (done) {
    _lintFunction({}, {}, done)
  })
  it('Lint with invalid instace (that returns no data)', function (done) {
    var stream = linter({ lintText: function (str, opts, callback) { callback() } })
    var fakeFile = new gutil.File({
      base: 'test/data',
      cwd: 'test/',
      path: 'test/data/testFile1.js',
      contents: testFile1
    })
    stream.once('data', function (newFile) {
      expect(newFile).to.exist
      expect(newFile.standard).to.exist
      expect(newFile.standard.skipped).to.be.ok
      done()
    })
    stream.write(fakeFile)
    stream.end()
  })
  it('Lint null file', function (done) {
    _lintNullOrStreamFunction(null, done)
  })
  it('Lint stream', function (done) {
    _lintNullOrStreamFunction(fs.createReadStream('test/data/testFile1.js'), done)
  })
})
