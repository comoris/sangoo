const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const buildPath = path.resolve(__dirname, 'dist');

module.exports = {
  devtool: 'eval-cheap-module-source-map',
  entry: {
    main: './src/js/index.js',
  },
  output: {
    filename: '[name].js',
    path: buildPath,
    filename: '[name].js',
  },
  devServer: {
    port: 8080,
    contentBase: path.join(__dirname, 'dist'),
  },
  node: {
    fs: 'empty',
  },
  module: {
    rules: [{
        test: /\.js$/,
        exclude: /node_modules/,
        // This package allows transpiling JavaScript files using Babel and webpack.
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
        },
      },
      {
        test: /\.(scss|css)$/,
        use: [{
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: (resourcePath, context) => {
                // publicPath is the relative path of the resource to the context
                // e.g. for ./css/admin/main.css the publicPath will be ../../
                // while for ./css/main.css the publicPath will be ../
                return path.relative(path.dirname(resourcePath), context) + '/';
              },
            },
          },
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      // {
      //     // A loader for webpack which transforms files into base64 URIs
      //     // Load all images as base64 encoding if they are smaller than 8192 bytes (8kb)
      //     // Don't forget to import it in index.js
      //     test: /\.(png|jpg|gif)$/,
      //     use: [{
      //         loader: 'url-loader',
      //         options: {
      //             // On development we want to see where the file is coming from, hence we preserve the [path]
      //             name: '[path][name].[ext]?hash=[hash:20]',
      //             limit: 8192,
      //         },
      //     }],
      // },
      // {
      //     // The file-loader resolves import/require() on a file into a url and emits the file into the output directory.
      //     // Copies all imported (via index.js) files into dis/assets/images
      //     test: /\.(jpe?g|png|gif|svg)$/i,
      //     /* Exclude fonts while working with images, e.g. .svg can be both image or font. */
      //     exclude: path.resolve(__dirname, '../src/assets/fonts'),
      //     use: [{
      //         loader: 'file-loader',
      //         options: {
      //             name: '[path][name].[ext]',
      //             outputPath: './assets/images'
      //         }
      //     }]
      // },
      // {
      //     // Load all icons
      //     test: /\.(eot|woff|woff2|svg|ttf)([\?]?.*)$/,
      //     use: [{
      //         loader: 'file-loader',
      //     }],
      // },
      {
        test: /\.(html)$/,
        include: path.join(__dirname, './src/partials'),
        use: {
          loader: 'html-loader',
          options: {
            interpolate: true,
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html',
      // inject: 'body',
    }),
    new HtmlWebpackPlugin({
      filename: 'experience.html',
      template: './src/experience.html',
      // inject: 'body',
    }),
    new HtmlWebpackPlugin({
      filename: 'inspiration.html',
      template: './src/inspiration.html',
      // inject: 'body',
    }),
    new HtmlWebpackPlugin({
      filename: 'sangooe.html',
      template: './src/sangooe.html',
      // inject: 'body',
    }),
    new HtmlWebpackPlugin({
      filename: 'testimonial_vpk.html',
      template: './src/testimonial_vpk.html',
      // inject: 'body',
    }),
    new CopyWebpackPlugin([{
      from: 'src/assets/images',
      to: 'images',
    }, ]),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // all options are optional
      filename: '[name].css',
      chunkFilename: '[id].css',
      ignoreOrder: false, // Enable to remove warnings about conflicting order
    }),
  ],
};