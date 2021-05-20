const proxy = require("http-proxy-middleware");
module.exports = function(app) {
  app.use(
    proxy("api_gateway/v1/recommendations/userattribute/trending", {
      target: "https://crm-nightly-new.cc.capillarytech.com/",
      changeOrigin: true,
      // pathRewrite: { '^/login-proxy': '' },
    })
  )
};