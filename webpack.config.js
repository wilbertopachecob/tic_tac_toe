module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [{ loader: "resolve-url-loader", options: { removeCR: true } }],
      },
    ],
  },
};
