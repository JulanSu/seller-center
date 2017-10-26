var gulp = require("gulp");
var gulpLoadPlugins = require('gulp-load-plugins');
var  $ = gulpLoadPlugins();

gulp.task('css', function(){
	return gulp.src(['./static/*.scss', './static/*.css'])
	.pipe($.plumber())
  .pipe($.sass.sync({
    outputStyle: 'expanded',
    precision: 10,
    includePaths: ['.']
  }).on('error', $.notify.onError("Error: <%= error.message %>")))
	.pipe($.autoprefixer({ browsers: ['last 2 versions'],cascade: false }))
  .pipe(gulp.dest('./src/styles'))
})

gulp.task('default', ['css'])