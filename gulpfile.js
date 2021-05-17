const gulp = require('gulp');
const connect = require('gulp-connect');

gulp.task('server', function() {
    connect.server({
        livereload: true,
        port: 8888,
		host: "0.0.0.0"
    });
});

gulp.task('default', gulp.parallel('server'));