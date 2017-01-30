'use strict';

import Config  from './tasks/config';
import Gulp    from 'gulp';

import templates from './tasks/templates';
import stylesheets from './tasks/stylesheets';

Gulp.task('default', [ 'templates', 'stylesheets' ]);
