var gulp = require('gulp'),
    browserSync = require('browser-sync'),
    changed = require('gulp-changed'),
    size = require('gulp-size'),
    sorting = require('postcss-sorting');

gulp.dest(function(file){
  return path.join(build_dir, path.dirname(file.path));
});

gulp.task('html', function() {
  gulp.src(['./src/*.html', './src/**/*.html'])
    .pipe(gulp.dest('public/'));
});

gulp.task('css', function () {
    var postcss    = require('gulp-postcss');
    //var sourcemaps = require('gulp-sourcemaps');

    return gulp.src('src/**/*.css')
      //.pipe( sourcemaps.init() )
      .pipe( postcss([
        sorting({ "sort-order": "alphabetical" }),
        require('autoprefixer'),
        require('precss')
        
      ]) )
      //.pipe( sourcemaps.write('.') )
      .pipe( gulp.dest('public/') );
});

gulp.task('browser-sync', ['html','css'], function() {
  browserSync({
    server: {
      baseDir: './public/',
      injectChanges: true,
      files: ["./public/**/*"],
    }
  });
});

gulp.task('deploy', function() {
  // TODO
});

gulp.task('watch', function() {
  // Watch .html files
  gulp.watch('src/*.html', ['html']);
  gulp.watch('src/**/*.html', ['html']);
  gulp.watch('src/**/*.css', ['css']);
  gulp.watch('public/**/*').on('change', browserSync.reload);
});

gulp.task('default', ['watch','html','css','browser-sync']);
