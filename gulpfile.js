const gulp = require("gulp"),
    sourcemaps = require('gulp-sourcemaps'),
    browserify = require("browserify"),
    browserSync = require("browser-sync")
    source = require('vinyl-source-stream'),
    sass = require('gulp-sass'),
    tsify = require("tsify"),
    tslint = require("gulp-tslint"),
    plumber = require("gulp-plumber");

const paths = {
        pages: ['index.html']
    };

gulp.task("copy-html", () => {
    return gulp.src(paths.pages)
        .pipe(gulp.dest(""));
});

gulp.task("tslint", () => {
    return gulp.src("js/src/**/*.ts")
        .pipe(plumber())
        .pipe(tslint({
            formatter: "stylish"
        }))
        .pipe(tslint.report({
            emitError: false
        }))
})

gulp.task("tsc", ["copy-html"], () => {
    return browserify({
        basedir: '.',
        debug: true,
        entries: ['js/src/main.ts'],
        cache: {},
        packageCache: {}
    })
    .plugin(tsify)
    .bundle()
    .on('error', console.error.bind(console))
    .pipe(source('main.js'))
    .pipe(gulp.dest("js"));
});

gulp.task("css", () =>{
    return gulp.src("css/src/*.scss")
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(sourcemaps.write("./sourcemaps"))
        .pipe(gulp.dest("./css"))
        .pipe(browserSync.stream());
})


gulp.task('default', ['tsc', 'css', 'tslint'], () => {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    gulp.watch("index.html").on("change", browserSync.reload)
    gulp.watch("js/src/*.ts", ['tsc']).on("change", browserSync.reload)
    gulp.watch("css/src/*.scss", ['css']);
});
