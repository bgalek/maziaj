'use strict';

var gulp = require('gulp');
var gulpif = require('gulp-if');
var rename = require('gulp-rename');
var csso = require('gulp-csso');
var autoprefixer = require('gulp-autoprefixer');
var less = require('gulp-less');
var sourcemaps = require('gulp-sourcemaps');


function handleError(err) {
    console.log(err.toString());
    this.emit('end');
}


module.exports = gulp.task('styles', function () {
    return gulp.src(config.paths.src.styles)
        .pipe(gulpif(!production, sourcemaps.init()))
        .pipe(less().on('error', handleError))
        .pipe(autoprefixer('last 1 version'))
        .pipe(gulpif(production, csso()))
        .pipe(gulpif(!production, sourcemaps.write()))
        .pipe(gulpif(production, rename(config.filenames.release.styles), rename(config.filenames.build.styles)))
        .pipe(gulpif(production, gulp.dest(config.paths.dest.release.styles), gulp.dest(config.paths.dest.build.styles)));
});
