const concat = require('gulp-concat');
const del = require('del');
const eslint = require('gulp-eslint');
const gulp = require('gulp');
const jsBeautify = require('gulp-jsbeautify');


gulp.task('_cleanDist', () => {
	return del.sync('./dist/');
});

gulp.task('_cleanTemp', () => {
	return del.sync('./temp/');
});

gulp.task('clean', ['_cleanDist', '_cleanTemp']);


gulp.task('js', () => {
	return gulp.src('./src/js/*.js')
		.pipe(concat('simple-js-mvc.js'))
		.pipe(gulp.dest('./temp/js/'));
})

gulp.task('eslint', ['js'], () => {
	return gulp.src(['./src/js/*.js'])
		.pipe(eslint())
		.pipe(eslint.format())
		.pipe(eslint.failAfterError());
});

gulp.task('_jsBeautify', () => {
	return gulp.src('./src/js/*.js')
		.pipe(jsBeautify({ indent_with_tabs: true }))
		.pipe(gulp.dest('./temp/js/'));
});

gulp.task('beautify', ['_jsBeautify']);

gulp.task('default', () => {
	return gulp.src('./src/**/*.*')
		.pipe(gulp.dest('./dist/'));
});