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
            },
            {
                test: /\.(sass|css|scss)$/,
                use: [
                  'style-loader',
                  'css-loader',
                  {
                    loader: "postcss-loader",
                    options: {
                      plugins: () => [
                        require("autoprefixer")()
                      ],
                    },
                  },
                ]
              },
        ]
    }
}

