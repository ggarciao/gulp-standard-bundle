#gulp-standard-dest
[![npm version](https://badge.fury.io/js/gulp-standard-dest.svg)](https://badge.fury.io/js/gulp-standard-dest)
[![Build Status](https://travis-ci.org/ggarciao/gulp-standard-dest.svg?branch=master)](https://travis-ci.org/ggarciao/gulp-standard-dest)
[![Dependencies Status](https://david-dm.org/ggarciao/gulp-standard-dest.svg)](https://david-dm.org/ggarciao/gulp-standard-dest)

> [Standard](https://github.com/feross/standard/) linter for gulp that use the given standard instance (or use the supported one as default)

[![NPM](https://nodei.co/npm/gulp-standard-dest.png)](https://nodei.co/npm/gulp-standard-dest/)

## Information
Created to support the usage of [standard](https://github.com/feross/standard/) and [standard-format](https://github.com/maxogden/standard-format) with gulp

## Usage

#### Install

```sh
$ npm install --save-dev gulp-standard-dest
```

## Linter examples (standard)

Using the 'default' standard version (check package dependencies)
```javascript
var gulp = require('gulp')
var linter = require('gulp-standard-dest').linter

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
var linter = require('gulp-standard-dest').linter

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
var linter = require('gulp-standard-dest').linter

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
var linter = require('gulp-standard-dest').linter

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
var formatter = require('gulp-standard-dest').formatter

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
var formatter = require('gulp-standard-dest').formatter

gulp.task('format', function () {
  return gulp.src(['./app.js'])
    .pipe(formatter(standardformat))
    .pipe(formatter.reporter('default'))
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
