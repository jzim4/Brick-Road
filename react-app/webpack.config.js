const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    entry: './pages/index.js', // Changed to index.js which contains ReactDOM.render
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    mode: 'development',
    devtool: 'source-map', // Equivalent to browserify's debug: true
    devServer: {
        allowedHosts: 'https://brick-road-api.vercel.app/',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env', {
                                targets: {
                                    browsers: ['> 1%', 'last 2 versions']
                                },
                                modules: 'commonjs'
                            }],
                            '@babel/preset-react'
                        ],
                        plugins: ['@babel/plugin-transform-modules-commonjs']
                    }
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx'] // Same as browserify extensions
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html'
        }),
        new webpack.DefinePlugin({
            'process.env.REACT_APP_SERVER_URL': JSON.stringify('http://localhost:8000')
        })
    ]
}