const path = require('path');

module.exports = (env) => {
  const out = env.production
    ? path.resolve(__dirname, 'dist')
    : path.resolve(__dirname, 'demo/js');

  return {
    entry: './src/index.ts',
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
      filename: 'ga-tracker.js',
      path: out,
    },
  };
};
