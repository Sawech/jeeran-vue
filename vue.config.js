// vue.config.js file to be place in the root of your repository
module.exports = {
  publicPath:
    process.env.NODE_ENV === "production" ? process.env.BASE_URL : "/",

  // proxy API requests to Valet during development
  devServer: {
    clientLogLevel: "debug",
    disableHostCheck: true,
  },

  pluginOptions: {
    i18n: {
      locale: "en",
      fallbackLocale: "en",
      localeDir: "locales",
      enableLegacy: false,
      runtimeOnly: false,
      compositionOnly: false,
      fullInstall: true,
    },
  },
};
