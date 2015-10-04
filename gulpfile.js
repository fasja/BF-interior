var gulp = require('gulp'),
    uncss = require('gulp-uncss'),
    minifyCSS = require('gulp-minify-css'),
    jsmin = require('gulp-jsmin'),
    rename = require('gulp-rename'),
    htmlmin = require('gulp-htmlmin'),
    imageResize = require('gulp-image-resize'),
    imagemin = require('gulp-imagemin'),
    put = require('gulp-put');

/*gulp.task('default', function() {
    gulp.src(['./style/*.css', 'bootstrap/css/bootstrap.css'])
        .pipe(uncss({
            html: ['*.html']
        }))
        .pipe(minifyCSS())
        .pipe(gulp.dest('./out/style'));

    gulp.src('./script/*.js')
        .pipe(jsmin())
        .pipe(gulp.dest('./out/script'));

    gulp.src('*.html')
        .pipe(htmlmin())
        .pipe(gulp.dest('./out/'));
}); */

gulp.task('svg-optimize', function(){
    gulp.src('./img/**/*.svg')
        .pipe(imagemin({
            progressive: true,
            interlaced: true,
            multipass: true
        }))
        .pipe(gulp.dest('dist/img'));
});

gulp.task('jpg-resize-opimize', function(){
   gulp.src('./img/**/*.{jpg,JPG,jpeg,JPEG,png,PNG}')
       .pipe(imageResize({
           width : 1920,
           height : 1920,
           crop : false,
           upscale : false
       }))
       .pipe(imagemin({
           progressive: true
       }))
       .pipe(gulp.dest('dist/img/'));
});

gulp.task('minify-static', function(){
    gulp.src(['bootstrap/**/*.css', 'style/*.css'], {base: './'})
        .pipe(uncss({
            html: ['*.html']
        }))
        //.pipe(minifyCSS())
        .pipe(gulp.dest('dist/'));

    gulp.src('*.html')
        .pipe(htmlmin())
        .pipe(gulp.dest('dist'));

    gulp.src('./script/*.js')
        .pipe(jsmin())
        .pipe(gulp.dest('dist/script'));

    gulp.src('Magnific-Popup-master/**/*.*')
        .pipe(gulp.dest('dist/Magnific-Popup-master/'));

    gulp.src('style/dev/**/*.*')
        .pipe(gulp.dest('dist/style/dev/'));

    gulp.src('style/dev/**/*.*')
        .pipe(gulp.dest('dist/style/dev/'));

    gulp.src('img/*.ico')
        .pipe(gulp.dest('dist/img'));

    gulp.src('script/dev/**/*.*')
        .pipe(gulp.dest('dist/script/dev/'));

    gulp.src('*.php')
        .pipe(gulp.dest('dist/'));

    gulp.src(['bootstrap/fonts/**/*.*', 'bootstrap/js/**/*.*'], {base: './bootstrap'})
        .pipe(gulp.dest('dist/bootstrap'));
});

gulp.task('default', ['svg-optimize', 'jpg-resize-opimize', 'minify-static']);