var gulp = require('gulp');
var react = require('gulp-react');

gulp.task('jsx', function() {
	gulp.src('./src/js/*.js')
		.pipe(react())
		.pipe(gulp.dest('./build/'));
});

gulp.task('default', function () {
  	gulp.watch('./src/js/*.js', ['jsx']);
});