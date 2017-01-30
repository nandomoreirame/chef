'use strict';

import Bourbon from 'node-bourbon';

const config = {
  src: {
    root: `./docs`,
    javascripts: `./docs/_assets/javascripts`,
    stylesheets: `./docs/_assets/stylesheets`,
    fonts: `./docs/_assets/fonts`,
    images: `./docs/_assets/images`,
    layouts: `./docs/_layouts`,
    pages: `./docs/_pages`,
  },
  dist: {
    root: `./dist`,
    javascripts: `./dist/assets/javascripts`,
    stylesheets: `./dist/assets/stylesheets`,
    fonts: `./dist/assets/fonts`,
    images: `./dist/assets/images`
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
      `bower`
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
  frontMatter: {
    property: 'page',
    remove: true
  }
};

module.exports = config;