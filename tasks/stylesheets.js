'use strict';

import pkg from '../package.json';
import Config from './config';

import Gulp from 'gulp';
import Plugins from 'gulp-load-plugins';

const $ = Plugins();

const plumberHandler = {
  errorHandler: $.notify.onError({
    title   : 'Gulp',
    message : 'Error: <%= error.message %>'
  })
};

const banner = ['/**',
  ' * <%= pkg.name %> - <%= pkg.description %>',
  ' * @version v<%= pkg.version %>',
  ' * @license <%= pkg.license %>',
  ' * @copyright 2016 <%= pkg.author %>.',
  ' * @link <%= pkg.url %>',
  ' */',
  ''].join('\n');

Gulp.task('stylesheets', () => Gulp.src([ `${Config.src.stylesheets}/*.sass` ])
  .pipe($.plumber(plumberHandler))
  .pipe($.sass(Config.sassConfig))
  .pipe($.autoprefixer(Config.autoprefixer))
  .pipe($.combineMq())
  .pipe($.size({ title: 'Stylesheets!', gzip: false, showFiles: true }))
  .pipe($.header(banner, { pkg }))
  .pipe(Gulp.dest(`${Config.dist.stylesheets}`))
  .pipe($.rename({ suffix: '.min' }))
  .pipe($.cssnano())
  .pipe($.size({ title: 'Stylesheets minified!', gzip: false, showFiles: true }))
  .pipe($.header(banner, { pkg }))
  .pipe(Gulp.dest(`${Config.dist.stylesheets}`))
  .pipe($.plumber.stop()));