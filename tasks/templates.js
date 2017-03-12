'use strict';

import fs from 'fs';
import path from 'path';
import frontMatter from 'front-matter';

import pkg from '../package.json';
import Config from '../config';

import Gulp from 'gulp';
import Plugins from 'gulp-load-plugins';

const $ = Plugins();
const isProd = Config.environment === 'production' ? true : false;

Gulp.task('demos', () => Gulp.src([ `${Config.demos.src}/**/*` ])
  .pipe($.size({ title: 'Demo files!', gzip: false, showFiles: true }))
  .pipe(Gulp.dest(`${Config.demos.dist}`)));

Gulp.task('templates', ['demos'], () => {
  const parseData = function (file) {
    const content = frontMatter(String(file.contents));
    file.contents = new Buffer(content.body);
    return content.attributes;
  };

  const getLayoutPath = function (name) {
    return path.resolve(process.cwd(), `${Config.docs.layouts}/`, `${name}.pug`);
  }

  const wrapHtml = function (file, name) {
    const html = String(file.contents),
          path = getLayoutPath(name);

    file.contents = fs.readFileSync(path);
    return { content: html };
  }

  return Gulp.src([ `${Config.docs.pages}/*.md` ])
    .pipe($.plumber(Config.plumberHandler))
    .pipe($.data((file) => require(Config.docs.config)))
    .pipe($.data((file) => parseData(file)))
    .pipe($.data((file) => {
      return {
        'production': isProd ? Config.environment : '',
        'min': isProd ? '.min' : ''
      }
    }))
    .pipe($.fileInclude({
      prefix: '@@',
      basepath: `${Config.docs.src}/`
    }))
    .pipe($.markdown())
    .pipe($.data((file) => wrapHtml(file, file.data.layout)))
    .pipe($.pug())
    .pipe($.rename(path => {
      if (path.basename !== 'index') {
        path.dirname = path.basename;
        path.basename = 'index';
      }
      path.extname = '.html';
    }))
    .pipe(isProd ? $.htmlmin({ collapseWhitespace: true }) : $.jsbeautifier({ indent_level: 2 }))
    .pipe(isProd ? $.util.noop() : $.size({ title: 'Templates!', gzip: false, showFiles: true }))
    .pipe(Gulp.dest(`${Config.docs.dist}`))
    .pipe($.plumber.stop());
});
