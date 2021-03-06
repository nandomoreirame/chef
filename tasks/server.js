'use strict'

import Config from '../config'
import browserSync from 'browser-sync'
import Gulp from 'gulp'

const bSync = browserSync.create()

Gulp.task('server', () => {
  bSync.init({
    port: 3000,
    server: {
      baseDir: `${Config.docs.dist}`
    }
  })

  Gulp.watch(`${Config.docs.src}/**/*.{pug,hbs,html}`, ['demos', 'templates'])
  Gulp.watch(`${Config.stylesheets.src}/**/*.{sass,scss}`, ['stylesheets'])
  Gulp.watch(`${Config.javascripts.src}/**/*`, ['javascripts'])
  Gulp.watch(`${Config.docs.dist}/**/*.{html,css,js}`).on('change', bSync.reload)
})
