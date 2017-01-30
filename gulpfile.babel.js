'use strict';

import Config from './tasks/config';
import Gulp from 'gulp';
import Sequence from 'run-sequence';
import Clean from 'gulp-clean';

import templates from './tasks/templates';
import stylesheets from './tasks/stylesheets';
import javascripts from './tasks/javascripts';
import server from './tasks/server';
import version from './tasks/version';

Gulp.task('clean', () => Gulp.src([ `${Config.dist.root}` ], { read: false })
  .pipe(Clean({ force: true })));

Gulp.task('build', ['clean'], () => Sequence(
  ['stylesheets'],
  ['javascripts'],
  ['templates']
));

Gulp.task('watch', ['build', 'server']);
Gulp.task('default', ['watch']);
