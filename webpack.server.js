module.exports = {
  mode: "production",
  entry: {
    server: "./server/main.ts",
  },
  module: {
    rules: [
      {
        exclude: ["/node_modules/", "/ui/"],
        loader: "ts-loader",
        test: /\.ts(x?)$/,
      },
    ],
  },
  output: {
    filename: "[name].js",
    path: __dirname + "/out/dist",
  },
  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
  },
  target: "node",
  node: {
    __dirname: false,
    __filename: false,
  }
};
