var gulp = require('gulp')

var gmocha = require('gulp-mocha')

var gstandard = require('./')

gulp.task('standard', function () {
  return gulp.src(['**/*.js', '!node_modules/**/*', '!test/data/**/*'], {read: true})
    .pipe(gstandard())
    .pipe(gstandard.reporter('default', { breakOnError: true }))
})

gulp.task('test', ['standard'], function () {
  return gulp.src(['test/**/*.js', '!test/data/**/*'], {read: false})
    .pipe(gmocha({reporter: 'spec'}))
})
