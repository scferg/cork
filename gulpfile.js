var gulp = require('gulp'),
    gutil = require('gulp-util'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    autoprefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    jshint = require('gulp-jshint'),
    replace = require('gulp-replace'),
    rename = require('gulp-rename'),
    cssnano = require('gulp-cssnano'),
    htmlPartial = require('gulp-html-partial'),
    sourcemaps = require('gulp-sourcemaps');

var config = {
    sourceMaps: !gutil.env.production
};

gulp.task('html', function() {
    gulp.src('src/pages/*.html')
        .pipe(htmlPartial({
            basePath: 'src/partials/',
            prettify: false
        }))
        .pipe(gulp.dest('app'));
});

gulp.task('css', function () {
    return gulp.src('src/scss/style.scss')
    .pipe(!gutil.env.production ? sourcemaps.init() : gutil.noop())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer('last 4 version'))
    .pipe(gulp.dest('app/assets/css'))
    .pipe(cssnano({
        discardComments: { removeAll: true }
    }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(!gutil.env.production ? sourcemaps.write() : gutil.noop())
    .pipe(gulp.dest('app/assets/css'))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('js',function(){
  gulp.src('src/js/scripts.js')
    .pipe(!gutil.env.production ? sourcemaps.init() : gutil.noop())
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'))
    .pipe(gulp.dest('app/assets/js'))
    .pipe(uglify())
    .on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
    .pipe(rename({ suffix: '.min' }))
    .pipe(!gutil.env.production ? sourcemaps.write() : gutil.noop())
    .pipe(gulp.dest('app/assets/js'))
    .pipe(browserSync.reload({stream:true, once: true}));
});

gulp.task('browser-sync', function() {
    browserSync.init(null, {
        server: {
            baseDir: "app"
        }
    });
});
gulp.task('bs-reload', function () {
    browserSync.reload();
});

gulp.task('default', ['html', 'css', 'js', 'browser-sync'], function () {
    gulp.watch("src/scss/**/*.scss", {cwd: './'}, ['css']);
    gulp.watch("src/js/*.js", ['js']);
    gulp.watch(["src/pages/**/*.html", "src/partials/**/*.html"], ['html', 'bs-reload']);
});
