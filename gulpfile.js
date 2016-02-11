var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    minifyCss = require('gulp-minify-css'),
    webserver = require('gulp-webserver'),
    os = require('os'),
    gulp = require('gulp'),
    open = require('gulp-open'),
    clean = require('gulp-clean'),
    watch = require('gulp-watch');

// 작업 경로 설정
var devSrc = 'front-src/dev';
var devPaths = {
    js: devSrc + '/js/**/*.js',  // 추후 js폴더 밑에 다른 폴더가 생성되더라도 하위 js를 모두 적용
    css: devSrc + '/css/**/*.scss',
    html : devSrc + '/html/**/*.*'
};

// 결과물 경로 설정
var buildSrc = 'front-src/build';

// gulp.task 를 사용하여 task를 추가한다. gulp.task('테스크명', function (){ return  })
gulp.task('combine-js', function () {
    return gulp.src(devPaths.js)
        .pipe(concat('result.js'))
        .pipe(uglify())
        .pipe(gulp.dest(buildSrc + '/js'));
});

gulp.task('compile-sass', function () {
    return gulp.src(devPaths.css)
        .pipe(concat('result.css'))
        .pipe(sass())
        .pipe(minifyCss())
        .pipe(gulp.dest(buildSrc + '/css'));
});

gulp.task('html-move', function () {
    return gulp.src(devPaths.html)
        .pipe(gulp.dest(buildSrc + '/html'));
});

gulp.task('server', function () {
    var options = {
        uri: "http://localhost:8000/html/index.html",
        app: 'chrome'
    };
    return gulp.src(buildSrc + "/")
        .pipe(webserver({
            livereload : true
        }))
        .pipe(open(options));
});

gulp.task('clean', function () {
    return gulp.src(buildSrc, {read: false})
        .pipe(clean());
});

gulp.task('compile', ['combine-js', 'compile-sass', 'html-move'], function(){
    gulp.start('server')
});

//기본 task 설정
gulp.task('default', ['clean'], function(){
    gulp.start('compile');
});