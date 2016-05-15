#gulp-standard-dest
[![Build Status](https://travis-ci.org/ggarciao/gulp-standard-dest.svg?branch=master)](https://travis-ci.org/ggarciao/gulp-standard-dest)

> [Standard](https://github.com/feross/standard/) linter for gulp that use the given standard instance (or use the supported one as default)

## Information
Create to correctly support the usage of [Standard](https://github.com/feross/standard/) with gulp

## Usage

#### Install

```sh
$ npm install --save-dev gulp-standard-dest
```

## Examples

Using the 'default' standard version (check package.json)
```javascript
var gulp = require('gulp')
var gstandard = require('gulp-standard-dest')

gulp.task('standard', function () {
  return gulp.src(['./app.js'])
    .pipe(gstandard())
    .pipe(gstandard.reporter('default', {
      breakOnError: true
    }))
})
```

Using the 'default' standard version with options
```javascript
var gulp = require('gulp')
var standardopts = { globals : ['identifier'] }
var gstandard = require('gulp-standard-dest')

gulp.task('standard', function () {
  return gulp.src(['./app.js'])
    .pipe(gstandard(undefined, standardopts))
    .pipe(gstandard.reporter('default', {
      breakOnError: true
    }))
})
```
Using a given standard instance
```javascript
var gulp = require('gulp')
var standard = require('standard')
var gstandard = require('gulp-standard-dest')

gulp.task('standard', function () {
  return gulp.src(['./app.js'])
    .pipe(gstandard(standard))
    .pipe(gstandard.reporter('default', {
      breakOnError: true
    }))
})
```
Using a given standard instance with options
```javascript
var gulp = require('gulp')
var standard = require('standard')
var standardopts = { globals : ['identifier'] }
var gstandard = require('gulp-standard-dest')

gulp.task('standard', function () {
  return gulp.src(['./app.js'])
    .pipe(gstandard(standard, standardopts))
    .pipe(gstandard.reporter('default', {
      breakOnError: true
    }))
})
```


## Reporters

#### Built-in

You can choose a reporter when you call
````javascript
stuff
  .pipe(standard())
  .pipe(standard.reporter('default', opts))
External
````

You can also use some other custom made reporter
````javascript
var reporter = require(<SOME_REPORTER>);

stuff
  .pipe(standard())
  .pipe(standard.reporter(reporter, opts))
````
OR - 
````javascript
stuff
  .pipe(standard())
  .pipe(standard.reporter(<REPORTER NAME>, opts))
````
#### Reporter options

##### breakOnError

Type: `boolean`
Default: `false`

Emit gulp error on reported error

##### breakOnWarning

Type: `boolean`
Default: `false`

Emit gulp error on reported warning


## LICENSE [MIT](LICENSE)
