const helpers = require('./helpers');
const webpackMerge = require('webpack-merge'); // used to merge webpack configs
const commonConfig = require('./webpack.common.js'); // the settings that are common to prod and dev

/**
 *  Plugins
 */
const DefinePlugin = require('webpack/lib/DefinePlugin');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

/**
 * Constants
 */
const ENV = process.env.ENV = process.env.NODE_ENV = 'development';
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3000;
const HMR = helpers.hasProcessFlag('hot');
const API_URL = process.env.API_URL || 'http://localhost:58796/api' ;
const METADATA = webpackMerge(commonConfig({env: ENV}).metadata, {
  host: HOST,
  port: PORT,
  ENV: ENV,
  HMR: HMR,
  API_URL : API_URL
});



/**
 * Webpack configuration
 *
 * See: http://webpack.github.io/docs/configuration.html#cli
 */
module.exports = function (options) {
  return webpackMerge(commonConfig({env: ENV}), {

    /**
     * Developer tool to enhance debugging
     *
     */
    devtool: 'cheap-module-source-map',

    /**
     * Options affecting the output of the compilation.
     *
     */
    output: {

      /**
       * The output directory as absolute path (required).
       *
       */
      path: helpers.root('dist'),

      /**
       * Specifies the name of each output file on disk.
       * IMPORTANT: You must not specify an absolute path here!
       *
       */
      filename: '[name].bundle.js',

      /**
       * The filename of the SourceMaps for the JavaScript files.
       * They are inside the output.path directory.
       */
      sourceMapFilename: '[file].map',

      /** The filename of non-entry chunks as relative path
       * inside the output.path directory.
       */
      chunkFilename: '[id].chunk.js',

      library: 'ac_[name]',
      libraryTarget: 'var',
    },

    module: {

      rules: [

        /**
         * Css loader support for *.css files (styles directory only)
         * Loads external css styles into the DOM, supports HMR
         *
         */
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
          include: [helpers.root('src', 'styles')]
        },

        /**
         * Sass loader support for *.scss files (styles directory only)
         * Loads external sass styles into the DOM, supports HMR
         *
         */
        {
          test: /\.scss$/,
          use: ['style-loader', 'css-loader', 'sass-loader'],
          include: [helpers.root('src', 'styles')]
        },

      ]

    },

    plugins: [

      new DefinePlugin({
        'ENV': JSON.stringify(METADATA.ENV),
        'HMR': METADATA.HMR,
        'process.env': {
          'ENV': JSON.stringify(METADATA.ENV),
          'NODE_ENV': JSON.stringify(METADATA.ENV),
          'HMR': METADATA.HMR,
          'API_URL': JSON.stringify(METADATA.API_URL)
        }
      }),

      new BundleAnalyzerPlugin({
        // Can be `server`, `static` or `disabled`. 
        // In `server` mode analyzer will start HTTP server to show bundle report. 
        // In `static` mode single HTML file with bundle report will be generated. 
        // In `disabled` mode you can use this plugin to just generate Webpack Stats JSON file by setting `generateStatsFile` to `true`. 
        analyzerMode: 'server',
        // Host that will be used in `server` mode to start HTTP server. 
        analyzerHost: '127.0.0.1',
        // Port that will be used in `server` mode to start HTTP server. 
        analyzerPort: 8888,
        // Path to bundle report file that will be generated in `static` mode. 
        // Relative to bundles output directory. 
        reportFilename: 'report.html',
        // Module sizes to show in report by default. 
        // Should be one of `stat`, `parsed` or `gzip`. 
        // See "Definitions" section for more information. 
        defaultSizes: 'parsed',
        // Automatically open report in default browser 
        openAnalyzer: true,
        // If `true`, Webpack Stats JSON file will be generated in bundles output directory 
        generateStatsFile: false,
        // Name of Webpack Stats JSON file that will be generated if `generateStatsFile` is `true`. 
        // Relative to bundles output directory. 
        statsFilename: 'stats.json',
        // Options for `stats.toJson()` method. 
        // For example you can exclude sources of your modules from stats file with `source: false` option. 
        // See more options here: https://github.com/webpack/webpack/blob/webpack-1/lib/Stats.js#L21 
        statsOptions: null,
        // Log level. Can be 'info', 'warn', 'error' or 'silent'. 
        logLevel: 'info'
      }),



      new LoaderOptionsPlugin({
        debug: true,
        options: {

        }
      }),

    ],

    /**
     * Webpack Development Server configuration
     */
    devServer: {
      port: METADATA.port,
      host: METADATA.host,
      historyApiFallback: true,
      watchOptions: {
        ignored: /node_modules/
      }
    },

    /**
     * Include polyfills or mocks for various node stuff
     * Description: Node configuration
     *
     * See: https://webpack.github.io/docs/configuration.html#node
     */
    node: {
      global: true,
      crypto: 'empty',
      process: true,
      module: false,
      clearImmediate: false,
      setImmediate: false
    }

  });
}