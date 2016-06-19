var gulp = require('gulp')

var gmocha = require('gulp-mocha')
var gistanbul = require('gulp-istanbul')
var gcoveralls = require('gulp-coveralls')

var gstandard = require('./')
var linter = gstandard.Linter
var formatter = gstandard.Formatter

var modulefiles = ['**/*.js', '!node_modules/**/*', '!test/**/*', '!coverage/**/*']
var moduleandtestfiles = ['**/*.js', '!node_modules/**/*', '!test/data/**/*', '!coverage/**/*']
var testsfiles = ['test/**/*.js', '!test/data/**/*']
var coverallsfiles = ['coverage/**/lcov.info']

gulp.task('format', function () {
  return gulp.src(moduleandtestfiles, {read: true})
    .pipe(formatter())
    .pipe(formatter.reporter('default', { breakOnError: true }))
    .pipe(gulp.dest('./'))
})

gulp.task('lint', function () {
  return gulp.src(moduleandtestfiles, {read: true})
    .pipe(linter())
    .pipe(linter.reporter('default', { breakOnError: true }))
})

gulp.task('pre-test', function () {
  return gulp.src(modulefiles)
    .pipe(gistanbul())
    .pipe(gistanbul.hookRequire())
})

gulp.task('test', ['lint', 'pre-test'], function () {
  return gulp.src(testsfiles, {read: false})
    .pipe(gmocha({reporter: 'spec'}))
    .pipe(gistanbul.writeReports())
    .pipe(gistanbul.enforceThresholds({ thresholds: { global: 10 } }))
})

gulp.task('coveralls', function () {
  return gulp.src(coverallsfiles, {read: false})
    .pipe(gcoveralls())
})
