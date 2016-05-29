var gulp = require('gulp')

var gmocha = require('gulp-mocha')

var gstandard = require('./')
var linter = gstandard.Linter
var formatter = gstandard.Formatter

gulp.task('format', function () {
  return gulp.src(['**/*.js', '!node_modules/**/*', '!test/data/**/*'], {read: true})
    .pipe(formatter())
    .pipe(formatter.reporter('default', { breakOnError: true }))
    .pipe(gulp.dest('./'))
})

gulp.task('check', function () {
  return gulp.src(['**/*.js', '!node_modules/**/*', '!test/data/**/*'], {read: true})
    .pipe(linter())
    .pipe(linter.reporter('default', { breakOnError: true }))
})

gulp.task('test', ['check'], function () {
  return gulp.src(['test/**/*.js', '!test/data/**/*'], {read: false})
    .pipe(gmocha({reporter: 'spec'}))
})
