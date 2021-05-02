const webpack = require('webpack');
const helpers = require('./helpers');

/**
 * Plugins
 */
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');
const CheckerPlugin = require('awesome-typescript-loader').CheckerPlugin;
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
const ProvidePlugin = require('webpack/lib/ProvidePlugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');

/**
 * Constants
 */

const HMR = helpers.hasProcessFlag('hot');
const AOT = process.env.BUILD_AOT || helpers.hasNpmFlag('aot');
const METADATA = {
  title: 'Mims',
  baseUrl: '/',
  isDevServer: helpers.isWebpackDevServer(),
  HMR: HMR
};

module.exports = function(options) {
  isProd = options.env === 'production';
  return {
    entry: {
      polyfills: './src/polyfills.ts',
      vendor: './src/vendor.ts',
      app: './src/main.ts',
      mimsdesign: './src/assets/styles/mims.style.css'
    },
    resolve: {
      extensions: ['.ts', '.js', '.json'],
      modules: [helpers.root('src', 'app'), helpers.root('node_modules')],
      alias: {
        '@api': helpers.root('src/app/api'),
        '@mimsUI': helpers.root('src/app/mims-ui')
      }
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          loaders: [
            {
              loader: 'awesome-typescript-loader',
              options: {
                configFileName: 'tsconfig.webpack.json',
                useCache: false
              }
            },
            'angular2-template-loader',
            'angular-router-loader'
          ],
          exclude: [/\.(spec)\.ts$/]
        },

        {
          test: /\.scss|\.css$/,
          use: ['to-string-loader', 'css-loader', 'sass-loader'],
          exclude: [helpers.root('src', 'assets', 'styles')]
        },
        {
          test: /\.scss|\.css$/,
          loader: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              'css-loader',
              {
                loader: 'sass-loader'
              }
            ]
          }),
          include: [helpers.root('src', 'assets', 'styles')]
        },
        //Images
        {
          test: /\.(png|jpg|jpeg|gif|svg)$/,
          loader: 'file-loader'
        },
        //Assets
        {
          test: /\.(eot|woff2?|ttf)([\?]?.*)$/,
          use: 'file-loader'
        },

        {
          test: /\.html$/,
          loader: 'html-loader',
          exclude: [helpers.root('src', 'index.html')]
        }
      ]
    },
    plugins: [
      new CheckerPlugin(),

      // new CommonsChunkPlugin({
      //   name: 'polyfills',
      //   chunks: ['polyfills']
      // }),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'polyfills',
        minChunks: Infinity
      }),

      new CommonsChunkPlugin({
        name: 'vendor',
        chunks: ['app'],
        minChunks: (module) => /node_modules/.test(module.resource)
      }),

      new ContextReplacementPlugin(
        /angular(\\|\/)core(\\|\/)@angular/,
        helpers.root('src'), // location of your src
        {
          /**
           * Your Angular Async Route paths relative to this root directory
           */
        }
      ),
      new ProvidePlugin({
        Reflect: 'core-js/es7/reflect'
      }),

      //new SpriteLoaderPlugin(),

      new ScriptExtHtmlWebpackPlugin({
        sync: /polyfill|vendor/,
        defaultAttribute: 'async',
        preload: [/polyfill|vendor|app/],
        prefetch: [/chunk/]
      }),

      new ExtractTextPlugin({ filename: 'mims-design.css', allChunks: true }),

      new HtmlWebpackPlugin({
        template: 'src/index.html',
        chunksSortMode: 'dependency',
        inject: 'body'
      })
    ],
    node: {
      global: true,
      crypto: 'empty',
      process: true,
      module: false,
      clearImmediate: false,
      setImmediate: false
    }
  };
};
