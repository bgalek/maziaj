'use strict';

var gulp = require('gulp');
var gulpif = require('gulp-if');
var imagemin = require('gulp-imagemin');

module.exports = gulp.task('images', function () {
    return gulp.src(config.paths.src.images)
        .pipe(gulpif(global.production, imagemin({ optimizationLevel: 5, progressive: true, interlaced: true })))
        .pipe(gulpif(global.production, gulp.dest(config.paths.dest.release.images), gulp.dest(config.paths.dest.build.images)));
});
