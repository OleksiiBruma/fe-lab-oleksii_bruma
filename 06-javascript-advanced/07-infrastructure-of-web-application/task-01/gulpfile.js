const { src, dest, parallel } = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const cssmin = require('gulp-cssmin');
const concat = require('gulp-concat');
const eslint = require('gulp-eslint');
const gulpIf = require('gulp-if');
const minify = require('gulp-minify');

function lint(){
  return src(['./*.js','!./gulpfile.js'])
.pipe(eslint({
  "parserOptions": { "ecmaVersion": 6,
    "sourceType" : "module"},
    'rules':{
      'quotes': ["error", "single"],
      'space-before-blocks': "error",
      'no-var': "error",
      'max-len': ["error",{"code":80}],
    }
  }))
      .pipe(eslint.format())
      .pipe(eslint.failAfterError());
}
function css() {
  return src('styles/*.css')
      .pipe(concat('storage.min.css'))
      .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
      }))
      .pipe(cssmin())
      .pipe(dest('dist/'))
}

 function bundle() {
   return src(['./*.js','!./gulpfile.js'])
       .pipe(concat('storage.js'))
       .pipe(minify())
       .pipe(gulpIf(lint, dest('./dist/')))
 }

exports.bundle = bundle;
exports.css = css;
exports.lint = lint;
exports.default = parallel(css ,bundle,lint);