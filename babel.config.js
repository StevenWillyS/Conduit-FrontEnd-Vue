module.exports = {
  presets: [
    '@vue/app',
    ['@babel/preset-env', {
      targets: {
        node: 'current',
      },
    }]
  ],
  plugins: [
    "babel-plugin-dynamic-import-node",
    "@babel/plugin-transform-runtime"
  ]
}
