/* eslint no-unused-vars:0 */
'use strict'

import pkg from './package.json'
import notify from 'gulp-notify'
import util from 'gulp-util'
import bourbon from 'node-bourbon'
import webpack from 'webpack'

// gulp --type production
const ENV = util.env.type ? util.env.type : 'development'
const isProd = (ENV === 'production')
const webpackPlugins = []
let min = ''

module.exports = {
  environment: ENV,
  docs: {
    config: `${__dirname}/docs/config.json`,
    src: `${__dirname}/docs`,
    dist: `${__dirname}/dist`,
    layouts: `${__dirname}/docs/layouts`,
    pages: `${__dirname}/docs/pages`,
    data: `${__dirname}/docs/data`
  },
  demos: {
    src: `${__dirname}/docs/demos`,
    dist: `${__dirname}/dist/demos`
  },
  stylesheets: {
    src: `${__dirname}/docs/assets/stylesheets`,
    dist: `${__dirname}/dist/assets/stylesheets`
  },
  javascripts: {
    src: `${__dirname}/docs/assets/javascripts`,
    dist: `${__dirname}/dist/assets/javascripts`
  },
  fonts: {
    src: `${__dirname}/docs/assets/fonts`,
    dist: `${__dirname}/dist/assets/fonts`
  },
  images: {
    src: `${__dirname}/docs/assets/images`,
    dist: `${__dirname}/dist/assets/images`
  },
  sassConfig: {
    sourcemap: true,
    noCache: true,
    style: 'nested',
    sourceComments: true,
    includePaths: [
      bourbon.includePaths,
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
      `javascripts`,
      `js`
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
    indent_char: ' '
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
  webpack: {
    watch: false,
    progress: true,
    devtool: 'source-map',
    output: {
      path: `${__dirname}/dist/assets/javascripts`,
      filename: isProd ? `[name].min.js` : `[name].js`
    },
    plugins: isProd ? [
      new webpack.optimize.UglifyJsPlugin(),
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': `"${ENV}"`
        }
      })
    ] : [],
    module: {
      loaders: [{
        test: /.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader'
      }]
    },
    babel: {
      presets: ['es2015']
    }
  },
  plumberHandler: {
    errorHandler: notify.onError({
      title: 'Gulp',
      message: 'Error: <%= error.message %>'
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
}
