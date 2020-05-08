module.exports = {
  mode: "production",
  entry: {
    server: "./server/main.ts",
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-typescript"],
          },
        },
      },
    ],
  },
  output: {
    filename: "[name].js",
    path: __dirname + "/out",
  },
  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
  },
  target: "node",
  node: {
    __dirname: false,
    __filename: false,
  },
};
