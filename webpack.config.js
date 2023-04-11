const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
module.exports = {
    entry:'./src/index.js',
    output: {
        filename: ' bundle.js',
        path: __dirname + '/dist',
    },
    mode: 'production',
    module:{
        rules:[
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
            {
                test: /\.css$/,
                use:[
                    { loader: "style-loader"},
                    { loader: "css-loader"}
                ]
            }
            ],
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    plugins: [new HtmlWebpackPlugin({
        // 指定打包的模板, 如果不指定会自动生成一个空的
        template: "./public/index.html",
        minify: {
            // 告诉htmlplugin打包之后的html文件需要压缩
            collapseWhitespace: true,
        }
    }),
        new CleanWebpackPlugin()
    ]
};
