module.exports = {
  entry: {
    app: "./ui/index.tsx",
  },
  module: {
    rules: [
      {
        exclude: ["/node_modules/", "/server/"],
        loader: "ts-loader",
        test: /\.ts(x?)$/,
        options: {
          configFile: "ui.tsconfig.json",
        },
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
};
