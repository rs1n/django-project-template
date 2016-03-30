'use strict';

var del = require('del');
var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');

var paths = {
    // images: 'client/img/**/*',
    // scripts: ['client/js/**/*.coffee', '!client/external/**/*.coffee'],
    styles: 'assets/styles/**/*.scss'
};

// Not all tasks need to use streams
// A gulpfile is just another node program and you can use any package available on npm
gulp.task('clean', function() {
    // You can use multiple globbing patterns as you would with `gulp.src`
    return del(['static/pages']);
});

gulp.task('styles', function () {
    return gulp.src(paths.styles)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('static/pages'));
});

// Rerun the task when a file changes
gulp.task('watch', function() {
    // gulp.watch(paths.scripts, ['scripts']);
    // gulp.watch(paths.images, ['images']);
    gulp.watch(paths.styles, ['styles']);
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['watch', 'styles']);
