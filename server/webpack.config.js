const webpack = require('webpack')
const path = require('path')
const nodeExternals = require('webpack-node-externals')
const StartServerPlugin = require('start-server-webpack-plugin')

require('dotenv').config()

module.exports = {
  entry: ['webpack/hot/poll?1000', './src/index'],
  watch: true,
  devtool: 'sourcemap',
  target: 'node',
  node: {
    __filename: true,
    __dirname: true
  },
  externals: [nodeExternals({ whitelist: ['webpack/hot/poll?1000'] })],
    module: {
      rules: [
        {
          test: /\.js?$/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                babelrc: false,
                presets: [['env', { modules: false }], 'stage-0'],
                plugins: ['transform-regenerator', 'transform-runtime']
              }
            }
          ],
          exclude: /node_modules/
        },
        {
          test: /\.(graphql|gql)$/,
          exclude: /node_modules/,
          use: {
            loader: 'raw-loader'
          }
        }
      ]
    },
    plugins: [
      new StartServerPlugin('server.js'),
      new webpack.NamedModulesPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
      new webpack.DefinePlugin({
        'process.env': { 
          BUILD_TARGET: JSON.stringify('server'),
          PORT: JSON.stringify(process.env.PORT),
          MONGO_URI: JSON.stringify(process.env.MONGO_URI),
          TOKEN_SECRET: JSON.stringify(process.env.TOKEN_SECRET),
          CLOUDINARY_API_KEY: JSON.stringify(process.env.CLOUDINARY_API_KEY),
          CLOUDINARY_CLOUD_NAME: JSON.stringify(process.env.CLOUDINARY_CLOUD_NAME),
          CLOUDINARY_API_SECRET: JSON.stringify(process.env.CLOUDINARY_API_SECRET),
          FILE_SIZE: JSON.stringify(process.env.FILE_SIZE)
         }
      }),
      new webpack.BannerPlugin({ banner: 'require("source-map-support").install();', raw: true, entryOnly: false })
    ],
    output: { path: path.join(__dirname, 'dist'), filename: 'server.js' }
};
