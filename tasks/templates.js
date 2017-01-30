'use strict';

import fs from 'fs';
import path from 'path';
import through from 'through2';
import swig from 'swig';

import pkg from '../package.json';
import Config from './config';

import Gulp from 'gulp';
import Plugins from 'gulp-load-plugins';

const $ = Plugins();

/**
 * Site metadata for use with templates.
 * @type {Object}
 */
const site = {};

function _applyLayout() {
  return through.obj((file, enc, cb) => {
    const data = {
      site,
      page: file.page,
      content: file.contents.toString()
    };

    const layoutFile = path.join(__dirname, '../docs', '_layouts', `${file.page.layout}.html`);
    const layout = swig.compileFile(layoutFile, {cache: false});

    file.contents = new Buffer(layout(data));
    cb(null, file);
  });
}

Gulp.task('templates', () => Gulp.src([ `${Config.src.pages}/*.md` ])
  .pipe($.frontMatter(Config.frontMatter))
  .pipe($.marked())
  .pipe(_applyLayout())
  .pipe($.replace('$$version$$', pkg.version))
  .pipe($.rename(path => {
    if (path.basename !== 'index') {
      path.dirname = path.basename;
      path.basename = 'index';
    }
  }))
  .pipe(Gulp.dest(`${Config.dist.root}`)));
