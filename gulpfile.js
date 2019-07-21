var gulp = require('gulp');
var concat = require('gulp-concat');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
let uglify = require('gulp-uglify-es').default;
var babelify = require("babelify");
let cleanCSS = require('gulp-clean-css');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('css', done => {
  gulp.src('src/common.blocks/**/*.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9'))
    .pipe(concat('style.css'))
    .pipe(gulp.dest('build/'));

    done();
});

gulp.task('js', done => {
  gulp.src('src/common.blocks/**/*.js')
    .pipe(concat('script.js'))
    .pipe(gulp.dest('build/'));

    done();
});

gulp.task('template', done => {
  gulp.src('src/template-engine.js')
    .pipe(concat('template-engine.js'))
    .pipe(gulp.dest('build/'));

    done();
});

// gulp.task('template', function() {
//   return browserify('./src/template-engine.js')
//     // .transform(babelify.configure({
//     //   presets: ["@babel/preset-env"]
//     // }))
//     .bundle()
//     .pipe(source('template-engine.js'))
//     .pipe(buffer())
//     // .pipe(uglify())
//     .pipe(gulp.dest('./build/'));
// });

gulp.task('default', gulp.series('css', 'js', 'template', function(done) {
  done();
}));
