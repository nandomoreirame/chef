'use strict';

import pkg from './package.json';
import Notify from 'gulp-notify';
import Bourbon from 'node-bourbon';

const config = {
  src: {
    root: './docs',
    javascripts: './docs/assets/javascripts',
    stylesheets: './docs/assets/stylesheets',
    fonts: './docs/assets/fonts',
    images: './docs/assets/images',
    demos: './docs/demos',
    layouts: './docs/layouts',
    pages: './docs/pages',
  },
  dist: {
    root: './dist',
    javascripts: './dist/assets/javascripts',
    stylesheets: './dist/assets/stylesheets',
    fonts: './dist/assets/fonts',
    images: './dist/assets/images'
  },
  sassConfig: {
    compass: true,
    sourcemap: false,
    noCache: true,
    style: 'nested',
    sourceComments: false,
    includePaths: [
      Bourbon.includePaths,
      `sass`,
      `stylesheets`,
      `node_modules`,
      `bower_components`,
      `bower_components/karin-css/sass`
    ]
  },
  jsIncludeConfig: {
    extensions: 'js',
    includePaths: [
      `node_modules`,
      `bower_components`,
      `js`,
      `javascripts`,
    ]
  },
  autoprefixer: {
    browsers: [
      'ie >= 9',
      'ie_mob >= 10',
      'ff >= 30',
      'chrome >= 34',
      'safari >= 5',
      'opera >= 23',
      'ios >= 6',
      'android >= 4.4',
      'bb >= 10'
    ],
    cascade: false
  },
  jsbeautifier: {
    indent_size: 2,
    indent_char: ' ',
  },
  imageConfig: {
    pngquant: true,
    optipng: true,
    zopflipng: true,
    advpng: true,
    jpegRecompress: false,
    jpegoptim: true,
    mozjpeg: true,
    gifsicle: true,
    svgo: true
  },
  frontMatter: {
    property: 'page',
    remove: true
  },
  plumberHandler: {
    errorHandler: Notify.onError({
      title   : 'Gulp',
      message : 'Error: <%= error.message %>'
    })
  },
  banner: [
    '/**',
    ' * <%= pkg.name %> - <%= pkg.description %>',
    ' * @version v<%= pkg.version %>',
    ' * @license <%= pkg.license %>',
    ' * @copyright 2017 <%= pkg.author %>.',
    ' * @link <%= pkg.url %>',
    ' */',
    ''
  ]
};

module.exports = config;
