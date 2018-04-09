var gulp = require("gulp");
var sass = require("gulp-sass");
var plumber = require("gulp-plumber");
var browserSync = require("browser-sync");
var notify = require("gulp-notify");
var pug = require("gulp-pug");
var pleeease = require('gulp-pleeease')

gulp.task("default", ["sass", "browser-sync", "pug", "js", "img", "watch"]);

// sassとpugの監視をして変換処理させる
gulp.task("watch", () => {
    gulp.watch(["./src/sass/**"], () => {
        gulp.start(["sass"]);
    });
    gulp.watch(["./src/pug/**"], () => {
        gulp.start(["pug"]);
    });
    gulp.watch(["./src/js/**"], () => {
        gulp.start(["js"]);
    });
    gulp.watch(["./src/img/**"], () => {
        gulp.start(["img"]);
    });
});

// ブラウザ表示
gulp.task("browser-sync", () => {
    browserSync({
        server: {
            baseDir: "./dist/" // サーバとなるrootディレクトリ
        }
    });
    // ファイルの監視
    // 以下のファイルが変わったらリロードする
    gulp.watch("./dist/js/*.js", ["reload"]);
    gulp.watch("./dist/*.html", ["reload"]);
});

// sassをcssに変換
gulp.task("sass", () => {
    gulp.src("./src/sass/**/*sass")
        .pipe(plumber({
            errorHandler: notify.onError("Error: <%= error.message %>")
        }))
        .pipe(sass())
        .pipe(pleeease({
            autoprefixer: {
                browsers: ["last 2 versions", "ie >= 9", "Android >= 4","ios_saf >= 8"]
            },
            minifier: false
        }))
        .pipe(gulp.dest("./dist/css"))
        // reloadせずにブラウザに変更をinjectする
        .pipe(browserSync.stream())
});

// pugをhtmlに変換
gulp.task("pug", () => {
    let option = {
        pretty: true
    }
    gulp.src("./src/pug/**/*.pug")
        .pipe(plumber({
            errorHandler: notify.onError("Error: <% error.message %>")
        }))
        .pipe(pug(option))
        .pipe(gulp.dest("./dist/"))
});

// jsをコピー
gulp.task("js", () => {
    gulp.src("./src/js/*.js")
        .pipe(gulp.dest('./dist/js/'))
});

// imgをコピー
gulp.task("img", () => {
    gulp.src("./src/img/*")
        .pipe(gulp.dest("./dist/img/"))
});

// ブラウザリロード処理
gulp.task("reload", () => {
    browserSync.reload();
});
