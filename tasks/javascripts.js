'use strict';

import pkg from '../package.json';
import Config from './config';

import Gulp from 'gulp';
import Plugins from 'gulp-load-plugins';

const $ = Plugins();

Gulp.task('javascripts', () =>  Gulp.src([`${Config.src.javascripts}/*.js`])
  .pipe($.plumber(Config.plumberHandler))
  .pipe($.include(Config.jsIncludeConfig))
  .pipe($.jsbeautifier(Config.jsbeautifier))
  .pipe($.header(Config.banner.join('\n'), { pkg }))
  .pipe($.size({ title: 'Javascripts', gzip: false, showFiles: true }))
  .pipe(Gulp.dest(`${Config.dist.javascripts}`))
  .pipe($.uglify())
  .pipe($.rename({ suffix: '.min' }))
  .pipe($.header(Config.banner.join('\n'), { pkg }))
  .pipe($.size({ title: 'Minify Javascripts', gzip: false, showFiles: true }))
  .pipe(Gulp.dest(`${Config.dist.javascripts}`))
  .pipe($.plumber.stop()));
