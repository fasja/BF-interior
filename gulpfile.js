var gulp = require('gulp'),
    uncss = require('gulp-uncss'),
    minifyCSS = require('gulp-minify-css'),
    jsmin = require('gulp-jsmin'),
    rename = require('gulp-rename'),
    htmlmin = require('gulp-htmlmin');
    /*notify = require("gulp-notify");*/

gulp.task('default', function() {
    gulp.src(['./style/*.css', 'bootstrap/css/bootstrap.css'])
        .pipe(uncss({
            html: ['*.html']
        }))
        //.pipe(rename({suffix: '.min'}))
        .pipe(minifyCSS())
        .pipe(gulp.dest('./out/style'));

    gulp.src('./script/*.js')
        .pipe(jsmin())
        //.pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./out/script'));

    gulp.src('*.html')
        .pipe(htmlmin())
        .pipe(gulp.dest('./out/'));

    /*gulp.src('bootstrap/css/bootstrap.css')
        .pipe(uncss({
            html: ['prices.html']
        }))
        .pipe(gulp.dest('./out/bootstrap/css'));*/
});