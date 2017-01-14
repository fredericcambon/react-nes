var path = require( 'path' )


module.exports = {
    entry: "./src/App.js",
    output: {
        filename: "dist/bundle.js"
    },
    module: {
        loaders: [ {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
                presets: [ 'react', 'es2015', 'stage-0' ]
            }
        } ]
    }
}
