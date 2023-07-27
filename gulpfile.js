let project_folder = require('path').basename(__dirname);
let source_folter = '#src';

let path = {
    build: {
        html: project_folder + '/',
        css: project_folder + '/css/',
        js: project_folder + '/js/',
        img: project_folder + '/img/',
        fonts: project_folder + '/fonts/',
    },
    src: {
        html: [source_folter + '/*.html', '!' + source_folter + '/_*.html'],
        css: source_folter + '/scss/style.scss',
        js: source_folter + '/js/*.js',
        img: source_folter + '/img/**/*.{png,jpg,gif,ico,svg,webp}',
        fonts: source_folter + '/fonts/*',
    },
    watch: {
        html: source_folter + '/**/*.html',
        css: source_folter + '/scss/**/*.scss',
        js: source_folter + '/js/**/*script.js',
        img: source_folter + '/img/**/*.{png,jpg,gif,ico,svg,webp}',
    },
    clean: './' + project_folder + '/'
}

let { scr, dest,  src } = require('gulp'),
    gulp = require('gulp'),
    browsersync = require('browser-sync').create(),
    fileinclude = require('gulp-file-include'),
    del = require('del'),
    scss = require('gulp-sass')(require('sass')),
    autoprefixer = require('gulp-autoprefixer'),
    gcmq = require('gulp-group-css-media-queries'),
    babel = require('gulp-babel'),
    imagemin = require('gulp-imagemin'),
    ttf2woff = require('gulp-ttf2woff'),
    ttf2woff2 = require('gulp-ttf2woff2'),
    fonter = require('gulp-fonter'),
    svgSprite = require('gulp-svg-sprite');

function browserSync(params) {
    browsersync.init({
        server: {
            baseDir: './' + project_folder + '/'
        },
        port: 3000,
        notify: false,
    })
}

function html() {
    return src(path.src.html)
        .pipe(fileinclude())
        .pipe(dest(path.build.html))
        .pipe(browsersync.stream())
}

function css() {
    return src(path.src.css)
        .pipe(
            scss({
                outputStyle: 'expanded'
            }).on('error', scss.logError)
        )
        .pipe(
            gcmq()
        )
        .pipe(
            autoprefixer({
                overrideBrowserslist: ['last 5 versions'],
                cascade: true
            })
        )
        .pipe(dest(path.build.css))
        .pipe(browsersync.stream())
}

function js() {
    return src(path.src.js)
        // .pipe(fileinclude())
        // .pipe(babel())
        .pipe(dest(path.build.js))
        .pipe(browsersync.stream())
}

function images() {
    return src(path.src.img)
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{
                removeViewBox: false
            }],
            interlaced: true,
            optimizationLevel: 3
        }))
        .pipe(dest(path.build.img))
        .pipe(browsersync.stream())
}

function watchFiles(params) {
    gulp.watch([path.watch.html], html);
    gulp.watch([path.watch.css], css);
    gulp.watch([path.watch.js], js);
    gulp.watch([path.watch.img], images);
}

function fonts() {
    return src(path.src.fonts)
        .pipe(dest(path.build.fonts))
        .pipe(browsersync.stream())
}

gulp.task('otf2ttf', function () {
    return scr([source_folter + '/fonts/*.otf'])
        .pipe(fonter({
            formats: ['ttf']
        }))
        .pipe(dest(source_folter + '/fonts'))
})

gulp.task('svgSprite', function () {
    return gulp.src([source_folter + '/img/iconsprite/*.svg'])
        .pipe(svgSprite({
            mode: {
                stack:{
                    sprite: '../img/icons/icons.svg',
                    example: true
                }
            }
        }))
        .pipe(dest(path.build.img))
})

function clean(param) {
    return del(path.clean);
}

let build = gulp.series(clean, gulp.parallel(js, css, html, images, fonts));
let watch = gulp.parallel(build, watchFiles, browserSync);

exports.fonts = fonts;
exports.images = images;
exports.js = js;
exports.css = css;
exports.html = html;
exports.build = build;
exports.watch = watch;
exports.default = watch;