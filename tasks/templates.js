'use strict';

import fs from 'fs';
import path from 'path';
import through from 'through2';
import swig from 'swig';
import frontMatter from 'front-matter';

import pkg from '../package.json';
import Config from '../config';

import Gulp from 'gulp';
import Plugins from 'gulp-load-plugins';

const $ = Plugins();

Gulp.task('demos', () => Gulp.src([ `${Config.src.demos}/**/*` ])
  .pipe(Gulp.dest(`${Config.dist.root}/demos`)));

Gulp.task('templates', ['demos'], () => {

  /**
   * Site metadata for use with templates.
   * @type {Object}
   */
  const site = {};

  const getLayoutPath = function (name) {
    return path.resolve(process.cwd(), `${Config.src.layouts}/`, `${name}.hbs`);
  }

  const parseContent = function (file) {
    return frontMatter(String(file.contents));
  }

  const compileHtml = function () {
    return $.compileHandlebars({}, Config.handlebars);
  };

  const parseData = function (file) {
    const content = parseContent(file);

    file.contents = new Buffer(content.body);

    return content.attributes;
  };

  const wrapHtml = function (file, name) {
    const html = String(file.contents),
          path = getLayoutPath(name);

    file.contents = fs.readFileSync(path);
    return { content: html };
  }

  Gulp.src([ `${Config.src.pages}/*.hbs` ])
    .pipe($.plumber(Config.plumberHandler))
    .pipe($.data((file) => parseData(file)))
    .pipe(compileHtml())
    .pipe($.data((file) => wrapHtml(file, file.data.layout)))
    .pipe(compileHtml())
    .pipe($.rename(path => {
      if (path.basename !== 'index') {
        path.dirname = path.basename;
        path.basename = 'index';
      }
      path.extname = '.html';
    }))
    // .pipe($.htmlmin({ collapseWhitespace: true }))
    .pipe(Gulp.dest(`${Config.dist.root}`))
    .pipe($.plumber.stop());
});
