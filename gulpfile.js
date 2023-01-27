const { src, dest, watch, series } = require("gulp");
const terser = require("gulp-terser");
const concatCss = require("gulp-concat-css");
// const imagewebp = require("gulp-webp");
const autoprefixer = require("gulp-autoprefixer");
const concatJs = require("gulp-concat");
const browsersync = require("browser-sync").create();
const imagemin = require("gulp-imagemin");

//CSS Task
function cssTask() {
   return src("src/assets/style/**/*.css", { sourcemaps: true })
      .pipe(autoprefixer())
      .pipe(concatCss("assets/styles/bunde.css"))
      .pipe(dest("build/", { sourcemaps: "." }));
}

//Javascript task

function jsTask() {
   return src("src/assets/js/**/*js").pipe(concatJs("assets/js/bunde.js")).pipe(dest("build/"));
}

//HTML task/

function htmlTask() {
   return src("src/*html").pipe(dest("build", { sourcemaps: "." }));
}

//Images
function imageTask() {
   return src("src/assets/img/**/*.{jpg,png,svg}").pipe(imagemin()).pipe(dest("build/assets/img"));
}

//Webp
// function webImage() {
//    return src("build/assets/img/*.{jpg,png}").pipe(imagewebp()).pipe(dest("build/assets/img"));
// }

function browsersyncServe(cb) {
   browsersync.init({
      server: {
         baseDir: "./build",
      },
      notify: false,
   });
   cb();
}

function browsersyncReload(cb) {
   browsersync.reload();
   cb();
}

function watchTask() {
   watch("src/*.html", series(htmlTask, browsersyncReload));
   watch("src/assets/style/**/*.css", series(cssTask, browsersyncReload));
   watch("src/assets/js/**/*.js", series(jsTask, browsersyncReload));
   watch("src/assets/img/**/*.{jpg,png,svg}", series(imageTask, browsersyncReload));
   // watch("build/assets/img/*{jpg,png}", webImage);
}

exports.default = series(htmlTask, jsTask, cssTask, browsersyncServe, imageTask, watchTask);
