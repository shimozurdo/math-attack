const path = require('path');

module.exports = (env) => {

    return {
        entry: './main.js',
        output: {
            path: path.resolve(__dirname, 'build'),
            filename: 'bundle.js',
            publicPath: '/'
        },        
        module: {
            rules: [
                {
                    test: /\.m?js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader"
                    }
                }              
            ]
        }
    }

};