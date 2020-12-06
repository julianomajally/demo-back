const LandingModel = require("../../../models/authentication/landing/landing.model");

exports.getItem = (req, res) => {
  res.status(200).send({ success: true, message: "Hello World" });
  // LandingModel.getItem()
  //   .then((result) => {
  //     console.log(result)
  //     res.status(200).send({ success: true, data: result });
  //   })
  //   .catch((error) => res.status(403).send({ success: false, error: error }));
};
