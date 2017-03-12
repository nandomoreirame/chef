'use strict';

import pkg from '../package.json';
import Config from '../config';
import browserSync from 'browser-sync';
import Gulp from 'gulp';

const bSync = browserSync.create();

Gulp.task('server', () => {
  bSync.init({
    server: {
      baseDir: `${Config.docs.dist}`
    }
  });

  Gulp.watch(`${Config.docs.src}/**/*.{pug,html,md,markdown}`, ['demos', 'templates']);
  Gulp.watch(`${Config.stylesheets.src}/**/*.{sass,scss}`, ['stylesheets']);
  Gulp.watch(`${Config.javascripts.src}/**/*`, ['javascripts']);
  Gulp.watch(`${Config.docs.dist}/**/*.{html,css,js}`).on('change', bSync.reload);
});
