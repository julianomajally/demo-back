const LandingRouter = require("./authentication/landing/landing.route");

exports.routesConfig = function (app) {
  LandingRouter.routesConfig(app);
};
