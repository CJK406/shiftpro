const path = require('path')

module.exports = {
  devServer: {
    proxy: 'https://app.shiftpro.dev'
  },
  configureWebpack: {
    resolve: {
      extensions: [".js", ".vue", ".json"],
      alias: {
        '@candidate': path.resolve('src/components/candidate'),
        '@common': path.resolve('src/components/common'),
        '@employer': path.resolve('src/components/employer'),
      }
    }
  }
}