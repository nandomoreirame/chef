'use strict';

import fs from 'fs';
import path from 'path';
import frontMatter from 'front-matter';

import pkg from '../package.json';
import Config from '../config';

import Gulp from 'gulp';
import Plugins from 'gulp-load-plugins';

const $ = Plugins();

Gulp.task('demos', () => Gulp.src([ `${Config.src.demos}/**/*` ])
  .pipe($.size({ title: 'Demo files!', gzip: false, showFiles: true }))
  .pipe(Gulp.dest(`${Config.dist.root}/demos`)));

Gulp.task('templates', ['demos'], () => {
  const parseData = function (file) {
    const content = frontMatter(String(file.contents));
    file.contents = new Buffer(content.body);
    return content.attributes;
  };

  const getLayoutPath = function (name) {
    return path.resolve(process.cwd(), `${Config.src.layouts}/`, `${name}.pug`);
  }

  const wrapHtml = function (file, name) {
    const html = String(file.contents),
          path = getLayoutPath(name);

    file.contents = fs.readFileSync(path);
    return { content: html };
  }

  return Gulp.src([ `${Config.src.pages}/*.md` ])
    .pipe($.plumber(Config.plumberHandler))
    .pipe($.data((file) => require('../docs/config.json')))
    .pipe($.data((file) => parseData(file)))
    .pipe($.fileInclude({
      prefix: '@@',
      basepath: './docs/'
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
    .pipe($.jsbeautifier({ indent_level: 2 }))
    // .pipe($.htmlmin({ collapseWhitespace: true }))
    .pipe($.size({ title: 'Templates!', gzip: false, showFiles: true }))
    .pipe(Gulp.dest(`${Config.dist.root}`))
    .pipe($.plumber.stop());
});
