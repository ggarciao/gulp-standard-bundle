/* globals it, describe */

var fs = require('fs')
var gutil = require('gulp-util')
var linter = require('../').Linter

var expect = require('chai').expect

var testFile1 = fs.readFileSync('test/data/testFile1.js')

describe('gulp-standard-dest', function () {
  it('should lint files', function (done) {
    var stream = linter()
    var fakeFile = new gutil.File({
      base: 'test/data',
      cwd: 'test/',
      path: 'test/data/testFile1.js',
      contents: testFile1
    })
    stream.once('data', function (newFile) {
      expect(newFile).to.exist
      expect(newFile.standard).to.exist
      expect(newFile.standard.results[0].messages[0].message).to.be.equal("Expected '===' and instead saw '=='.")
      done()
    })
    stream.write(fakeFile)
    stream.end()
  })
})
