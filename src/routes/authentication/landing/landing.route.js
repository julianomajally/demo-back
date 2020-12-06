const LandingController = require("../../../controllers/authentication/landing/landing.controller");

exports.routesConfig = function (app) {
  // FETCH Data: 0 for Student and 1 for Enterprise
  app.get("/landing", [LandingController.getItem]);
};
