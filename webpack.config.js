module.exports = {
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                query: {
                    presets: ['@babel/preset-react', '@babel/preset-env'],
                    plugins: ['@babel/proposal-class-properties']
                }}
            }
        ]
    }
}