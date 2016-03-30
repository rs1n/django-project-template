'use strict';

var del = require('del');
var gulp = require('gulp');
// var concat = require('gulp-concat');
var imagemin = require('gulp-imagemin');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');

var paths = {
    images: 'assets/images/**/*',
    // scripts: ['client/js/**/*.coffee', '!client/external/**/*.coffee'],
    styles: {
        all: 'assets/styles/**/*.scss',
        main: 'assets/styles/**/application.scss'
    }
};

// Not all tasks need to use streams
// A gulpfile is just another node program and you can use any package available on npm
gulp.task('clean', function() {
    // You can use multiple globbing patterns as you would with `gulp.src`
    return del(['static/pages']);
});

// Process SASS
gulp.task('styles', ['clean'], function () {
    return gulp.src(paths.styles.main)
        .pipe(sourcemaps.init())
            .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('static/pages/styles'));
});

// Copy all static images
gulp.task('images', ['clean'], function() {
  return gulp.src(paths.images)
    // Pass in options to the task
    .pipe(imagemin())
    .pipe(gulp.dest('static/pages/images'));
});

// Rerun the task when a file changes
gulp.task('watch', function() {
    // gulp.watch(paths.scripts, ['scripts']);
    gulp.watch(paths.styles.all, ['styles']);
    gulp.watch(paths.images, ['images']);
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['watch', 'styles', 'images']);
