'use strict';

import pkg from '../package.json';
import Config from '../config';
import browserSync from 'browser-sync';
import Gulp from 'gulp';

const bSync = browserSync.create();

Gulp.task('server', () => {
  bSync.init({
    server: {
      baseDir: `${Config.dist.root}`
    }
  });

  Gulp.watch(`${Config.src.root}/**/*.{pug,html,md,markdown}`, ['demos', 'templates']);
  Gulp.watch(`${Config.src.stylesheets}/**/*.{sass,scss}`, ['stylesheets']);
  Gulp.watch(`${Config.src.javascripts}/**/*`, ['javascripts']);
  Gulp.watch(`${Config.dist.root}/**/*.{html,css,js}`).on('change', bSync.reload);
});
