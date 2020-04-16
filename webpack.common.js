module.exports = {
  entry: {
    app: "./ui/index.tsx",
    server: "./server/main.ts",
  },
  module: {
    rules: [
      {
        exclude: ["/node_modules/"],
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
