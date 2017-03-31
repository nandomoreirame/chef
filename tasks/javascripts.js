'use strict'

import pkg from '../package.json'
import Config from '../config'

import Gulp from 'gulp'
import Plugins from 'gulp-load-plugins'
import WebpackStream from 'webpack-stream'

const $ = Plugins()
const isProd = Config.environment === 'production'

Gulp.task('javascripts', () => Gulp.src([`${Config.javascripts.src}/*.js`])
  .pipe($.plumber(Config.plumberHandler))
  .pipe($.sourcemaps.init())
  .pipe(WebpackStream(Config.webpack))
  .pipe($.header(Config.banner.join('\n'), { pkg }))
  .pipe(isProd ? $.util.noop() : $.size({ title: 'Javascripts', gzip: false, showFiles: true }))
  .pipe($.sourcemaps.write())
  .pipe(Gulp.dest(`${Config.javascripts.dist}`))
  .pipe($.plumber.stop()))
