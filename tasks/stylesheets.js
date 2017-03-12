'use strict';

import pkg from '../package.json';
import Config from '../config';

import Gulp from 'gulp';
import Plugins from 'gulp-load-plugins';

const $ = Plugins();
const isProd = Config.environment === 'production' ? true : false;

Gulp.task('stylesheets', () => Gulp.src([ `${Config.stylesheets.src}/*.sass` ])
  .pipe($.plumber(Config.plumberHandler))
  .pipe($.sourcemaps.init())
  .pipe($.sass(Config.sassConfig))
  .pipe($.autoprefixer(Config.autoprefixer))
  .pipe($.combineMq())
  .pipe(isProd ? $.cssnano() : $.jsbeautifier({ indent_level: 2 }))
  .pipe(isProd ? $.rename({ suffix: '.min' }) : $.util.noop())
  .pipe($.header(Config.banner.join('\n'), { pkg }))
  .pipe(isProd ? $.util.noop() : $.size({ title: 'Stylesheets!', gzip: false, showFiles: true }))
  .pipe($.sourcemaps.write())
  .pipe(Gulp.dest(`${Config.stylesheets.dist}`))
  .pipe($.plumber.stop()));
