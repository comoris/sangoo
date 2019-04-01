const path = require ('path');

const HtmlWebpackPlugin = require ('html-webpack-plugin');
const CopyWebpackPlugin = require ('copy-webpack-plugin');

const buildPath = path.resolve (__dirname, 'dist');

module.exports = {
  devtool: 'eval-cheap-module-source-map',
  entry: './src/js/index.js',
  output: {
    filename: '[name].js',
    path: buildPath,
    filename: 'bundle.js',
  },
  devServer: {
    port: 8080,
    contentBase: path.join (__dirname, 'dist'),
  },
  node: {
    fs: 'empty',
  },
  module: {
    rules: [
      {
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
        use: [
          {
            // Adds CSS to the DOM by injecting a <style> tag
            // creates style nodes from JS strings
            loader: 'style-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            // translates CSS into CommonJS
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            // compiles Sass to CSS
            loader: 'sass-loader',
            options: {
              outputStyle: 'expanded',
              sourceMap: true,
              sourceMapContents: true,
            },
          },
          // Please note we are not running postcss here
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
        include: path.join (__dirname, './src/partials'),
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
    new HtmlWebpackPlugin ({
      filename: 'index.html',
      template: './src/index.html',
      // inject: 'body',
    }),
    new HtmlWebpackPlugin ({
      filename: 'experience.html',
      template: './src/experience.html',
      // inject: 'body',
    }),
    new CopyWebpackPlugin ([
      {
        from: 'src/assets/images',
        to: 'images',
      },
    ]),
  ],
};
