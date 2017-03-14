var gulp = require("gulp");
var sourcemaps = require('gulp-sourcemaps');
var browserify = require("browserify");
var browserSync = require("browser-sync")
var source = require('vinyl-source-stream');
var sass = require('gulp-sass');
var tsify = require("tsify");
var paths = {
    pages: ['index.html']
};

gulp.task("copy-html", function () {
    return gulp.src(paths.pages)
        .pipe(gulp.dest(""));
});

gulp.task("tsc", ["copy-html"], function () {
    return browserify({
        basedir: '.',
        debug: true,
        entries: ['js/src/main.ts'],
        cache: {},
        packageCache: {}
    })
    .plugin(tsify)
    .bundle()
    .pipe(source('main.js'))
    .pipe(gulp.dest("js"));
});

gulp.task("css", function(){
    return gulp.src("css/src/*.scss")
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(sourcemaps.write("./sourcemaps"))
        .pipe(gulp.dest("./css"))
        .pipe(browserSync.stream());
})


gulp.task('default', ['tsc'], function () {

    // Serve files from the root of this project
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

    // add browserSync.reload to the tasks array to make
    // all browsers reload after tasks are complete.
    gulp.watch("js/src/*.ts", ['tsc']).on("change", browserSync.reload)
    gulp.watch("css/src/*.scss", ['css']);
});
