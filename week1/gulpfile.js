var gulp = require('gulp');
var sass = require('gulp-sass');
var cssMin = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var htmlMin = require('gulp-htmlmin');
var server = require('gulp-webserver');
var fs = require('fs');
var url = require('url');
var path = require('path');

gulp.task('css', function () {//操作cass转码合并压缩
    return gulp.src('src/css/*.cass')
        .pipe(sass())
        .pipe(concat('all.min.css')) 
        .pipe(cssMin())
        .pipe(gulp.dest('bulid/css'));
});

gulp.task('js', function () {//操作js合并压缩
    return gulp.src('src/js/*.js')
        .pipe(concat('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('bulid/js'));
});

gulp.task('html', function () {//操作html压缩
    return gulp.src('src/*.html')
        .pipe(htmlMin({
            collapseWhitespace: true
        }))
        .pipe(gulp.dest('bulid'));
});

gulp.task('server', function () {//起服务
    gulp.src('bulid')
        .pipe(server({
            port: 8000,
            // open: true,
            livereload: true,
            middleware: function (req, res, next) {
                var pathname = url.parse(req.url).path;
                
                if (req.url === '/favicon.ico') {
                    return false;
                }
                if (pathname === '/' || pathname === '/index.html') {
                    var p = path.join(__dirname, 'bulid', 'index.html');
                    res.end(fs.readFileSync(p).toString());
                } else {
                    var p = path.join(__dirname, 'bulid', pathname);
                    res.end(fs.readFileSync(p).toString());
                }
            }
        }));
});

gulp.task('bulid', ['css', 'js', 'html']);
gulp.task('dev', ['server']);