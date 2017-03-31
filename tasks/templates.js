/* eslint handle-callback-err: 0 */
'use strict'

import fs from 'fs'
import path from 'path'
import frontMatter from 'front-matter'
import yaml from 'js-yaml'
import Config from '../config'
import Gulp from 'gulp'
import Plugins from 'gulp-load-plugins'

const $ = Plugins()
const isProd = Config.environment === 'production'

Gulp.task('demos', () => Gulp.src([ `${Config.demos.src}/**/*` ])
  .pipe($.size({ title: 'Demo files!', gzip: false, showFiles: true }))
  .pipe(Gulp.dest(`${Config.demos.dist}`)))

Gulp.task('templates', ['demos'], () => {
  const parseData = function (file) {
    const content = frontMatter(String(file.contents))
    file.contents = new Buffer(content.body)
    return content.attributes
  }

  const getLayoutPath = function (name) {
    return path.resolve(process.cwd(), `${Config.docs.layouts}/`, `${name}.pug`)
  }

  const wrapHtml = function (file, name) {
    const html = String(file.contents)
    const path = getLayoutPath(name)

    file.contents = fs.readFileSync(path)
    return { content: html }
  }

  return Gulp.src([ `${Config.docs.pages}/*` ])
    .pipe($.plumber(Config.plumberHandler))
    .pipe($.data((file) => require(Config.docs.config)))
    .pipe($.data((file) => parseData(file)))
    .pipe($.data((file) => {
      return {
        'base_url': isProd ? '/chef' : '',
        'production': isProd ? Config.environment : '',
        'min': isProd ? '.min' : ''
      }
    }))
    .pipe($.data((file) => {
      fs.readdir(Config.docs.data, (err, files) => {
        let yamlData = []
        files.forEach(file => {
          yamlData.push(yaml.safeLoad(fs.readFileSync(`${Config.docs.data}/${file}`)))
        })
        return yamlData
      })
    }))
    .pipe($.hb({
      partials: `${Config.demos.src}/**/*.hbs`,
      // helpers: `${Config.docs.data}`,
      data: `${Config.docs.data}/*.json`
    }))
    .pipe($.data((file) => wrapHtml(file, file.data.layout)))
    .pipe($.pug())
    .pipe($.rename(path => {
      if (path.basename !== 'index') {
        path.dirname = path.basename
        path.basename = 'index'
      }
      path.extname = '.html'
    }))
    .pipe(isProd ? $.htmlmin({ collapseWhitespace: true }) : $.jsbeautifier({ indent_level: 2 }))
    .pipe(isProd ? $.util.noop() : $.size({ title: 'Templates!', gzip: false, showFiles: true }))
    .pipe(Gulp.dest(`${Config.docs.dist}`))
    .pipe($.plumber.stop())
})
