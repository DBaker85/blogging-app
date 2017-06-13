var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
// var root = path.normalize(__dirname + '/..');
var fs = require('fs-extra');
// var glob = require('glob');



// var shared = glob.sync("./scripts/common/!(polyfill)/*.ts");


module.exports = {
  entry: {
    main:'./app/scripts/main.ts'
  },
  output: {
    filename: '[name].[chunkhash].bundle.js',
    path: path.join(__dirname,'/public/scripts/')
  },
   resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /\.tsx?$/,
        loaders: ['awesome-typescript-loader','angular2-template-loader']
      },
      { 
      test: /\.(html)$/, 
      loader: 'raw-loader',
      exclude: /\.async\.(html)$/
    },
      { 
      test: /\.(scss)$/, 
      loaders: ['raw-loader','sass-loader'],
      exclude: /\.async\.(scss)$/
    }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({  // Also generate a test.html
       filename: path.join(__dirname,'/public/index.html'),
       template: './app/index.html'
     }),
  new webpack.optimize.CommonsChunkPlugin({
    name: "vendor",
    minChunks: function(module){
      return module.context && module.context.indexOf("node_modules") !== -1;
    }
  }),
  new webpack.optimize.CommonsChunkPlugin({
    name: ['commons','bootstrap']
  }),
  //  new webpack.HotModuleReplacementPlugin()
  // new webpack.optimize.UglifyJsPlugin()
],
devServer: {
  contentBase: path.join(__dirname, "/public"),
  // compress: true,
  port: 9000
}
};
