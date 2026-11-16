var gulp = require('gulp'),
    sass = require('gulp-sass'),
    gulpSourcemaps  = require("gulp-sourcemaps"),
    livereload = require('gulp-livereload'),
    connect = require("gulp-connect"),
    cleanCSS = require("gulp-clean-css"),
    //svgSprite = require("gulp-svg-sprites"),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    inlinesource = require('gulp-inline-source'),
    uglify = require('gulp-uglify');

var path = {
    HTML: './src/*.html',
    SASS: './src/sass/style.scss',
    JS: './src/js/script.js',
    LIB: './src/js/lib/*.js',
    SVG: './src/images/svg-icons',
    IMG: './src/images/icons/*',
    FONT: './src/fonts/*',
    DEST: './www/',
    DEST_JS: './www/js',
    DEST_CSS: './www/css',
    DEST_IMG: './www/images/',
    DEST_FONT: './www/fonts/',
    RUBY_SASS: './src/sass/rubyskin.scss'
};

gulp.task('css', function() {
    return gulp.src(path.SASS)
        .pipe(gulpSourcemaps.init())
        .pipe(sass())
        .pipe(gulpSourcemaps.write())
        .pipe(gulp.dest(path.DEST_CSS))
        .pipe(cleanCSS())
        .pipe(livereload())
        .pipe(connect.reload());
});

gulp.task('rubyskincss', function() {
    return gulp.src(path.RUBY_SASS)
        .pipe(gulpSourcemaps.init())
        .pipe(sass())
        .pipe(gulpSourcemaps.write())
        .pipe(gulp.dest(path.DEST_CSS))
        .pipe(cleanCSS())
        .pipe(livereload())
        .pipe(connect.reload());
});

gulp.task('js', function() {
    gulp.src([path.LIB, path.JS])
    .pipe(concat('scriptAll.js'))
    .pipe(uglify())
    .pipe(rename({
       suffix: '.min'
   }))
   .pipe(gulp.dest(path.DEST_JS));
});

gulp.task('connect', function() {
    connect.server();
});

/*gulp.task('sprites', function () {
    return gulp.src('./src/images/svg-icons/*.svg')
        .pipe(svgSprite({
            cssFile: "../../src/sass/_sprite.scss",
            svg: {
               sprite: "vm-sprite.svg"
           },
           preview: false,
           svgPath: "../../www/images/vm-sprite.svg"
        }))
        .pipe(gulp.dest("./www/images"));
});*/

gulp.task('cleanCSS', function () {
    gulp.src(['./www/css/style.css','./www/css/rubyskin.css'])
        .pipe(cleanCSS({keepBreaks: true}))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('www/css'))
    ;
});

gulp.task('copyHtmlFiles', function () {
    gulp.src(path.HTML)
        .pipe(gulp.dest(path.DEST))
        .pipe(connect.reload());
});

gulp.task('copyImgFiles', function () {
    return gulp.src(path.IMG)
        .pipe(gulp.dest(path.DEST_IMG))
        .pipe(connect.reload());
});

gulp.task('copyFontFiles', function () {
    return gulp.src(path.FONT)
        .pipe(gulp.dest(path.DEST_FONT))
        .pipe(connect.reload());
});

gulp.task('inlinesource', ['css', 'js'], function () {
    return gulp.src(['./src/index.html','./src/help.html'])
        .pipe(inlinesource())
        .pipe(gulp.dest('./www'));
});

gulp.task('watch', function() {
    var server = livereload();
    gulp.watch(path.SASS, ['css']);
    gulp.watch(path.JS, ['js']);
    gulp.watch(path.IMG, ['copyImgFiles']);
    livereload.listen();
});

gulp.task('default', ['css','rubyskincss', 'cleanCSS','watch', 'connect', 'js', 'copyImgFiles', 'copyFontFiles', 'copyHtmlFiles', 'inlinesource']);
