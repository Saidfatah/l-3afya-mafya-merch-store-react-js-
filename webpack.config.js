const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin');
const webpack = require('webpack')
const dotenv = require('dotenv')
const fs = require('fs');

module.exports =(env)=>{
  const currentPath = path.join(__dirname);
  
  const basePath = currentPath + '/.env';

  const envPath = basePath + '.' + env.ENVIRONMENT;

  const finalPath = fs.existsSync(envPath) ? envPath : basePath;

  const fileEnv = dotenv.config({ path: finalPath }).parsed;
 
  const envKeys = Object.keys(fileEnv).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(fileEnv[next]);
    return prev;
  }, {});
  console.log(envKeys)

  return{
    entry :"./client/src/index.js",
    devServer:{historyApiFallback: true},
    output:{
        path:path.resolve(__dirname,"./build"),
        filename:'index.js',
        publicPath: '/'
    },
    plugins:[
        new HTMLPlugin({template:'./client/src/index.html'}),
        new webpack.DefinePlugin(envKeys),
        new CopyPlugin({
            patterns: [
              { from: './client/src/images', to: 'images' },
            ],
          }),
    ],
    module:{
        rules:[
            { 
                test : /\.js$/,
                exclude:/node_modules/,
                use:{
                    loader:"babel-loader"
                },
            },
            {
                test: /\.(png|gif|jpg)$/,
                include: [
                  path.join(__dirname, './client/src/images')
                ],
                loader: 'file-loader',
             },
            {
                test:/.(png|jpg|woff|woff2|eot|ttf|svg|gif)$/, //Customise according to your need
                use: [
                  {
                    loader: 'url-loader',
                    options: {
                      limit: 100000000,
                    }
                  }
               ]
            },
            {
                test: /\.js$/,
                enforce: 'pre',
                use: ['source-map-loader'],
            },
            {
                test: /\.css$/i,
                loader: 'style-loader!css-loader' 
            },
        ]
    }
}}