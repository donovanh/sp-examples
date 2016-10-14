var gulp = require("gulp"),
    browserSync = require("browser-sync"),
    changed = require("gulp-changed"),
    size = require("gulp-size"),
    sorting = require("postcss-sorting"),
    clean = require("gulp-clean");

gulp.dest(function(file){
  return path.join(build_dir, path.dirname(file.path));
});

gulp.task("clean", function () {
  return gulp.src('./public', {read: false})
    .pipe(clean());
});

gulp.task("html", function() {
  return gulp.src(["./src/*.html", "./src/**/*.html"])
    .pipe(gulp.dest("public/"));
});

gulp.task("jpg", function() {
  return gulp.src(["./src/*.jpg", "./src/**/*.jpg"])
    .pipe(gulp.dest("public/"));
});

gulp.task("css", function () {
    var postcss    = require("gulp-postcss");
    //var sourcemaps = require("gulp-sourcemaps");

    return gulp.src("src/**/*.css")
      //.pipe( sourcemaps.init() )
      .pipe( postcss([
        sorting({ "sort-order": "alphabetical" }),
        require("autoprefixer"),
        require("postcss-nested"),
        require("precss"),
        require('postcss-partial-import')()
      ]) )
      //.pipe( sourcemaps.write(".") )
      .pipe( gulp.dest("public/") );
});

gulp.task("js", function() {
  return gulp.src(["./src/*.js", "./src/**/*.js"])
    .pipe(gulp.dest("public/"));
});

gulp.task("browser-sync", ["html","css","js"], function() {
  browserSync({
    server: {
      baseDir: "./public/",
      injectChanges: true,
      files: ["./public/**/*"],
    }
  });
});

gulp.task("watch", function() {
  // Watch .html files
  gulp.watch("src/*.html", ["html", browserSync.reload]);
  gulp.watch("src/**/*.html", ["html", browserSync.reload]);
  gulp.watch("src/**/*.css", ["css", browserSync.reload]);
  gulp.watch("src/**/*.js", ["js", browserSync.reload]);
});

gulp.task("default", ["html","js","css","jpg","browser-sync","watch"]);
