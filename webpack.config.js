const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin');

module.exports ={
    entry :"./src/index.js",
    output:{
        path:path.resolve(__dirname,"./dist"),
        filename:'index.js',
    },
    plugins:[
        new HTMLPlugin({template:'./src/index.html'}),
        new CopyPlugin({
            patterns: [
              { from: './src/images', to: 'images' },
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
                  path.join(__dirname, './src/images')
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
}