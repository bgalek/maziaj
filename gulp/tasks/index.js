'use strict';

var gulp = require('gulp');
var gulpif = require('gulp-if');
var replace = require('gulp-replace');
var jade = require('gulp-jade');

module.exports = gulp.task('index', function () {
    return gulp.src(config.paths.src.index)
        .pipe(gulpif(production,
            replace('//styles', '<link href="' + config.filenames.release.styles + '" rel="stylesheet">'),
            replace('//styles', '<link href="' + config.filenames.build.styles + '" rel="stylesheet">')
        ))
        .pipe(gulpif(production,
            replace('//scripts', '<script src="' + config.filenames.release.scripts + '"></script>'),
            replace('//scripts', '<script src="' + config.filenames.build.scripts + '"></script>')
        ))
        .pipe(gulpif(production,
            gulp.dest(config.paths.dest.release.index),
            gulp.dest(config.paths.dest.build.index)));
});
