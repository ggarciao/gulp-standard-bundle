var gulp = require('gulp')

var gmocha = require('gulp-mocha')

// var standard = require('standard')
// var gstandard = require('gulp-standard-dest')

// gulp.task('standard', function () {
//   return gulp.src(['**/*.js', '!node_modules/**/*'], {read: false})
//     .pipe(gstandard(standard))
//     .pipe(gstandard.reporter('default', { breakOnError: true }))
// })

gulp.task('test', function () {
  return gulp.src(['test/**/*.js','!test/fixtures/**/*'], {read: false})
    .pipe(gmocha({reporter: 'spec'}))
})