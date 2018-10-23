var gulp = require("gulp")
var htmlclean = require("gulp-htmlclean")
var imagemin = require("gulp-imagemin")
var ungilfy = require("gulp-uglify")
var debug = require("gulp-strip-debug")
var concat = require("gulp-concat")
var less = require("gulp-less")
var postcss = require("gulp-postcss")
var autoprefixer = require("autoprefixer")
var cssnano = require("cssnano")
var connect = require("gulp-connect")
// console.log(process.env.NODE_ENV == "producation") 判断是否是生产模式 flase则是开发
var devMode = process.env.NODE_ENV == "development";
var floder = {
    src: "src/",
    dist: "dist/"
}

gulp.task("html", function () {
    var page = gulp.src(floder.src + "html/*")
    if (!devMode) {
        page.pipe(htmlclean())
    }

    page.pipe(gulp.dest(floder.dist + "html/"))
})

gulp.task("images", function () {
    gulp.src(floder.src + "images/*")
        .pipe(imagemin())
        .pipe(gulp.dest(floder.dist + "images/"))
})

gulp.task("js", function () {
    var page = gulp.src(floder.src + "js/*")
    if (!devMode) {
        page.pipe(debug())
            .pipe(ungilfy())
    }

    page.pipe(gulp.dest(floder.dist + "js/"))

})
gulp.task("css", function () {
    var options = [autoprefixer(), cssnano()]
    var page = gulp.src(floder.src + "css/*")
        .pipe(less())
    if (!devMode) {
        page.pipe(postcss(options))
    }

    page.pipe(gulp.dest(floder.dist + "css/"))
})
gulp.task("watch", function () {
    gulp.watch(floder.src + "html/*", ["html"])
    gulp.watch(floder.src + "images/*", ["images"])
    gulp.watch(floder.src + "js/*", ["js"])
    gulp.watch(floder.src + "css/*", ["css"])
})
gulp.task("server", function () {
    connect.server({
        port: "8090"
    })
})


gulp.task("default", ["html", "images", "js", "css", "server","watch"])