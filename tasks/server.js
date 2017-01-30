'use strict';

import pkg from '../package.json';
import Config from './config';

import Gulp from 'gulp';
import BrowserSync from 'browser-sync';

const bSync = BrowserSync.create();
const reload = bSync.reload;

Gulp.task('server', function () {
  bSync.init({
    server: {
      baseDir: `${Config.dist.root}`
    }
  });

  Gulp.watch(`${Config.dist.root}/**/*`).on('change', reload);
});
