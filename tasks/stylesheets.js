'use strict';

import pkg from '../package.json';
import Config from './config';

import Gulp from 'gulp';
import Plugins from 'gulp-load-plugins';

const $ = Plugins();

Gulp.task('stylesheets', () => Gulp.src([ `${Config.src.stylesheets}/*.sass` ])
  .pipe($.plumber(Config.plumberHandler))
  .pipe($.sass(Config.sassConfig))
  .pipe($.autoprefixer(Config.autoprefixer))
  .pipe($.combineMq())
  .pipe($.size({ title: 'Stylesheets!', gzip: false, showFiles: true }))
  .pipe($.header(Config.banner.join('\n'), { pkg }))
  .pipe(Gulp.dest(`${Config.dist.stylesheets}`))
  .pipe($.rename({ suffix: '.min' }))
  .pipe($.cssnano())
  .pipe($.size({ title: 'Stylesheets minified!', gzip: false, showFiles: true }))
  .pipe($.header(Config.banner.join('\n'), { pkg }))
  .pipe(Gulp.dest(`${Config.dist.stylesheets}`))
  .pipe($.plumber.stop()));
