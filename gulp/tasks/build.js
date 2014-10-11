'use strict';

var gulp = require('gulp');
var runSequence = require('run-sequence');

module.exports = gulp.task('build', function () {
    runSequence(
        'clean',
        ['index', 'styles', 'images', 'assets', 'templates', 'lint'],
        'browserify',
        ['minify']
    );
});
