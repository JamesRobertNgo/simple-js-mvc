const gulp = require('gulp');

gulp.task('default', () => {
	console.log('default');
	return gulp.src('./src/**/*.*')
		.pipe(gulp.dest('./dist/'))
});