const gulp        = require('gulp');
const ts          = require('gulp-typescript');
const browsersync = require('browser-sync').create();
const sass        = require('gulp-sass');
const filter      = require('gulp-filter');

const ts_proj     = ts.createProject('tsconfig.json');
const sass_filter = filter('**/*.sass', { restore: true });

const paths = {
	bin: { src: "./src/bin/**/*", dest: "./dist/bin" },
	views: { src: "./src/views/**/*", dest: "./dist/views" },
	public: { src: "./src/public/**/*", dest: "./dist/public" },
	server: {
		script: "./bin/www",
		watch: "./",
		cwd: "./dist",
	}
}

const compile_ts = () => {
	return ts_proj.src()
		.pipe(ts_proj())
		.js.pipe(gulp.dest('./dist'));
}

const compile_bin = () => {
	return gulp.src(paths.bin.src)
		.pipe(gulp.dest(paths.bin.dest));
}

const compile_views = () => {
	return gulp.src(paths.views.src)
		.pipe(gulp.dest(paths.views.dest))
		.on('end', browsersync.reload);
}

const compile_public = () => {
	return gulp.src(paths.public.src)
		.pipe(sass_filter)
		.pipe(sass().on('error', sass.logError))
		.pipe(sass_filter.restore)
		.pipe(gulp.dest(paths.public.dest))
		.on('end', browsersync.reload);
}

const start_browsersync = done => {

	browsersync.init({
		proxy: "localhost:3000",
		port: 3001
	});

	done()

};

const watch = done => {

	gulp.watch('./src/**/*.ts', compile_ts);
	gulp.watch(paths.bin.src, compile_bin);
	gulp.watch(paths.views.src, gulp.parallel(compile_views));
	gulp.watch(paths.public.src, compile_public);

	done();

}

const compile = gulp.parallel(compile_ts, compile_bin, compile_views, compile_public);

const serve = gulp.series(compile, start_browsersync);

const default_task = gulp.series(watch, serve);

exports.compile_ts;
exports.compile_bin;
exports.compile_views;
exports.compile_public;
exports.compile;
exports.watch;
exports.serve;

exports.default = default_task;
