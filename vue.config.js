module.exports = {
  /**
   * You will need to set publicPath if you plan to deploy your site under a sub path,
   * for example GitHub Pages. If you plan to deploy your site to https://foo.github.io/bar/,
   * then publicPath should be set to "/bar/".
   * In most cases please use '/' !!!
   * Detail: https://cli.vuejs.org/config/#publicpath
   */
  publicPath: '/',
  assetsDir: 'static',
  lintOnSave: false, // process.env.NODE_ENV === 'development',
  devServer: {
    host: "0.0.0.0",
    port: 8080,
    https: false,
    // open: true,
    proxy: {
        '/index': {
            target: 'http://47.98.142.113:8443/api',
            changeOrigin: true,
            ws: true,
            pathRewrite: {
                '^/index': ''
            }
        }
    }
  },
}
