#gulp-standard-bundle


> Linter for gulp that use the given [standard](https://github.com/feross/standard/) instance (or use the supported one as default) and format the code with a given [standard-format](https://github.com/maxogden/standard-format) instance (or use the supported one as default)

[![NPM](https://nodei.co/npm/gulp-standard-bundle.png)](https://nodei.co/npm/gulp-standard-bundle/)

[![Build Status](https://travis-ci.org/ggarciao/gulp-standard-bundle.svg?branch=master)](https://travis-ci.org/ggarciao/gulp-standard-bundle)
[![Coverage Status](https://coveralls.io/repos/github/ggarciao/gulp-standard-bundle/badge.svg?branch=master)](https://coveralls.io/github/ggarciao/gulp-standard-bundle?branch=master)
[![bitHound Overall Score](https://www.bithound.io/github/ggarciao/gulp-standard-bundle/badges/score.svg)](https://www.bithound.io/github/ggarciao/gulp-standard-bundle)
[![bitHound Dependencies](https://www.bithound.io/github/ggarciao/gulp-standard-bundle/badges/dependencies.svg)](https://www.bithound.io/github/ggarciao/gulp-standard-bundle/master/dependencies/npm)
[![bitHound Dev Dependencies](https://www.bithound.io/github/ggarciao/gulp-standard-bundle/badges/devDependencies.svg)](https://www.bithound.io/github/ggarciao/gulp-standard-bundle/master/dependencies/npm)
[![bitHound Code](https://www.bithound.io/github/ggarciao/gulp-standard-bundle/badges/code.svg)](https://www.bithound.io/github/ggarciao/gulp-standard-bundle)

## Information
Created to support the usage of [standard](https://github.com/feross/standard/) and [standard-format](https://github.com/maxogden/standard-format) with gulp (fork of [gulp-standard](https://www.npmjs.com/package/gulp-standard) to include the formatter)

## Usage

#### Install

```sh
$ npm install --save-dev gulp-standard-bundle
```

## Linter examples (standard)

Using the 'default' standard version (check package dependencies)
```javascript
var gulp = require('gulp')
var linter = require('gulp-standard-bundle').linter

gulp.task('lint', function () {
  return gulp.src(['./app.js'])
    .pipe(linter())
    .pipe(linter.reporter('default', {
      breakOnError: true
    }))
})
```

Using the 'default' standard version with options
```javascript
var gulp = require('gulp')
var linteropts = { globals : ['identifier'] }
var linter = require('gulp-standard-bundle').linter

gulp.task('lint', function () {
  return gulp.src(['./app.js'])
    .pipe(linter(undefined, linteropts))
    .pipe(linter.reporter('default', {
      breakOnError: true
    }))
})
```
Using a given standard instance
```javascript
var gulp = require('gulp')
var standard = require('standard')
var linter = require('gulp-standard-bundle').linter

gulp.task('lint', function () {
  return gulp.src(['./app.js'])
    .pipe(linter(standard))
    .pipe(linter.reporter('default', {
      breakOnError: true
    }))
})
```
Using a given standard instance with options
```javascript
var gulp = require('gulp')
var standard = require('standard')
var linteropts = { globals : ['identifier'] }
var linter = require('gulp-standard-bundle').linter

gulp.task('lint', function () {
  return gulp.src(['./app.js'])
    .pipe(linter(standard, linteropts))
    .pipe(linter.reporter('default', {
      breakOnError: true
    }))
})
```

## Formatter examples (standard-format)

Using the 'default' standard-format version (check package dependencies)
```javascript
var gulp = require('gulp')
var formatter = require('gulp-standard-bundle').formatter

gulp.task('format', function () {
  return gulp.src(['./app.js'])
    .pipe(formatter())
    .pipe(formatter.reporter('default'))
})
```

Using a given standard-format instance
```javascript
var gulp = require('gulp')
var standardformat = require('standard-format')
var formatter = require('gulp-standard-bundle').formatter

gulp.task('format', function () {
  return gulp.src(['./app.js'])
    .pipe(formatter(standardformat))
    .pipe(formatter.reporter('default'))
})
```

Overriding the formated source files
```javascript
var gulp = require('gulp')
var formatter = require('gulp-standard-bundle').formatter

gulp.task('format', function () {
  return gulp.src('**/*.js')
    .pipe(formatter())
    .pipe(formatter.reporter('default'))
    .pipe(gulp.dest('.'))
})
```

## Reporters

#### Built-in

You can choose a reporter when you call
````javascript
stuff
  .pipe(linter())
  .pipe(linter.reporter('default', opts))
````

#### Custom

You can also use some other reporter instance
````javascript
var reporter = require(<REPORTER NAME>);
...
  .pipe(formatter())
  .pipe(formatter.reporter(reporter))
````
Or pass the reporter name ()
````javascript
...
  .pipe(linter())
  .pipe(linter.reporter(<REPORTER NAME>, opts))
````
#### Linter Reporter options

##### breakOnError

Type: `boolean`
Default: `false`

Emit gulp error on reported error

##### breakOnWarning

Type: `boolean`
Default: `false`

Emit gulp error on reported warning

#### Formatter Reporter options

No options

## LICENSE [MIT](LICENSE)
