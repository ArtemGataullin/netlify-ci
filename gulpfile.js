const gulp = require('gulp');
const concat = require('gulp-concat-css'); // он умеет склеивать CSS-файлы в один
const plumber = require('gulp-plumber'); //плагин, который производит сборку, даже если в коде есть ошибки (как минимум пытается собрать этот код);
const del = require('del'); // умеет удалять файлы и папки
const browserSync = require('browser-sync').create(); //позволит сделать сервер с режимом просмотра результатов в реальном времени
const build = gulp.series(clean, gulp.parallel(html, css, images, fonts)); // позволит одной командой производить сборку проекта
const watchapp = gulp.parallel(build, watchFiles, serve); // позволит одной командой следить за изменения в папке src и автоматически производить сборку проекта

function html() {
  return gulp.src('src/**/*.html')
    .pipe(plumber())
      .pipe(gulp.dest('dist/'))
    .pipe(browserSync.reload({stream: true}));
}

function css() {
  return gulp.src('src/blocks/**/*.css')
    .pipe(plumber())
      .pipe(concat('bundle.css'))
        .pipe(gulp.dest('dist/'))
      .pipe(browserSync.reload({stream: true}));
}

function images() {
  return gulp.src('src/images/**/*.{jpg,png,svg,gif,ico,webp,avif}')
    .pipe(gulp.dest('dist/images'))
    .pipe(browserSync.reload({stream: true}));
}

function fonts() {
  return gulp.src('src/fonts/**/*.{css,woff,woff2}')
    .pipe(gulp.dest('dist/fonts'))
    .pipe(browserSync.reload({stream: true}));
}

function clean() {
  return del('dist');
}

function watchFiles() {
  gulp.watch(['src/**/*.html'], html);
  gulp.watch(['src/blocks/**/*.css'], css);
  gulp.watch(['src/images/**/*.{jpg,png,svg,gif,ico,webp,avif}'], images);
  gulp.watch(['src/fonts/**/*.{css,woff,woff2}'], fonts);
}

function serve() {
  browserSync.init({
    server: {
      baseDir: './dist'
    }
  });
}
exports.default = watchapp;  // строчка, которая позволит вызвать задачу слежения одной командой gulp из терминала
exports.watchapp = watchapp; // строчка, которая позволит вызвать задачу слежения за изменениями в папке src и автоматический перенос их в папку dist из терминала
exports.build = build; // строчка, которая позволит вызвать задачу сборки всех файлов из папки src в папку dist из терминала
exports.clean = clean; // строчка, которая позволит вызвать задачу удаления всех файлов из папки dist перед новой сборкой из терминала
exports.fonts = fonts; // строчка, которая позволит вызвать задачу Копирования шрифтов из src в dist из терминала
exports.images = images; // строчка, которая позволит вызвать задачу Копирования изображений из src в dist из терминала
exports.css = css; // строчка, которая позволит вызвать задачу Копирования css файлов из src в dist и склеивания их в один bundle из терминала
exports.html = html; // строчка, которая позволит вызвать задачу Копирования html файлов из src в dist из терминала