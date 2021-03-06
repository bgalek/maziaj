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
        .pipe(gulpif(!global.production, sourcemaps.init()))
        .pipe(less().on('error', handleError))
        .pipe(autoprefixer('last 1 version'))
        .pipe(gulpif(global.production, csso()))
        .pipe(gulpif(!global.production, sourcemaps.write()))
        .pipe(gulpif(global.production, rename(config.filenames.release.styles), rename(config.filenames.build.styles)))
        .pipe(gulpif(global.production, gulp.dest(config.paths.dest.release.styles), gulp.dest(config.paths.dest.build.styles)));
});
