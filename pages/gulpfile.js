'use strict';

var autoprefixer = require('autoprefixer');
var del = require('del');
var gulp = require('gulp');
var cleanCSS = require('gulp-clean-css');
var concat = require('gulp-concat');
var imagemin = require('gulp-imagemin');
var postCSS = require('gulp-postcss');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');

var paths = {
    images: 'assets/images/**/*',
    scripts: {
        all: 'assets/scripts/**/*.js',
        copy: [
            'assets/scripts/index.js'
        ],
        join: [
            'assets/scripts/vendor/jquery.js',
            'assets/scripts/common.js'
        ]
    },
    styles: {
        all: 'assets/styles/**/*.scss',
        main: 'assets/styles/**/application.scss'
    }
};

// Clean dest scripts folder
gulp.task('clean:scripts', function() {
    return del(['static/pages/scripts']);
});

// Clean dest styles folder
gulp.task('clean:styles', function() {
    return del(['static/pages/styles']);
});

// Clean dest images folder
gulp.task('clean:images', function() {
    return del(['static/pages/images']);
});

// Clean dest folder
gulp.task('clean', ['clean:scripts', 'clean:styles', 'clean:images']);

// Copy scripts
gulp.task('scripts:copy', ['clean'], function() {
    return gulp.src(paths.scripts.copy)
        .pipe(sourcemaps.init())
            .pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('static/pages/scripts'));
});

// Concat scripts
gulp.task('scripts:join', ['clean'], function() {
    return gulp.src(paths.scripts.join)
        .pipe(sourcemaps.init())
            .pipe(uglify())
            .pipe(concat('application.js'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('static/pages/scripts'));
});

// Process scripts
gulp.task('scripts', ['scripts:copy', 'scripts:join']);

// Process SASS
gulp.task('styles', ['clean'], function () {
    return gulp.src(paths.styles.main)
        .pipe(sourcemaps.init())
            .pipe(sass().on('error', sass.logError))
            .pipe(postCSS([autoprefixer()]))
            .pipe(cleanCSS())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('static/pages/styles'));
});

// Copy all static images
gulp.task('images', ['clean'], function() {
    return gulp.src(paths.images)
        .pipe(imagemin())
        .pipe(gulp.dest('static/pages/images'));
});

// Rerun the task when a file changes
gulp.task('watch', function() {
    gulp.watch([
        paths.scripts.all, paths.styles.all, paths.images
    ], ['scripts', 'styles', 'images']);
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['watch', 'scripts', 'styles', 'images']);
