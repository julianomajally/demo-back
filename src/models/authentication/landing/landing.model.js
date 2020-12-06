const { writeLogsToTxt } = require("../../../common/config/functions");

const mongoose = require("../../../common/config/server/mongoose.service")
  .mongoose;
const Schema = mongoose.Schema;

const defaultObject = (type, required = true) => {
  return {
    type: type || String,
    required: required,
  };
};

const defaultOption = {
  autoIndex: true,
};

const landingSchema = new Schema(
  {
    message: defaultObject(),
  },
  defaultOption
);

landingSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

// Ensure virtual fields are serialised.
landingSchema.set("toJSON", {
  virtuals: true,
});

landingSchema.findById = function (value) {
  return this.model("landing").find({ id: this.id }, value);
};

const Landing = mongoose.model("landing", landingSchema);

exports.getItem = () => {
  return Landing.find()
    .then((result) => result)
    .catch((err) => {
      writeLogsToTxt(err);
      throw err;
    });
};

exports.getItemById = (id) => {
  return new Promise((resolve, reject) => {
    Landing.findById(id).exec(function (err, user) {
      if (!err) {
        resolve(user);
      } else {
        writeLogsToTxt(err);
        reject(err);
      }
    });
  });
};

exports.create = (data) => {
  const landingPage = new Landing(data);
  return landingPage
    .save()
    .then((result) => result)
    .catch((err) => {
      writeLogsToTxt(err);
      throw err;
    });
};

exports.getItems = (perPage, page) => {
  return new Promise((resolve, reject) => {
    Landing.find().exec(function (err, landing) {
      if (err) {
        writeLogsToTxt(err);
        reject(err);
      } else {
        resolve(landing);
      }
    });
  });
};

exports.update = (id, data) => {
  return Landing.findById(id)
    .then((user) => {
      return user
        .updateOne(data)
        .then((result) => result)
        .catch((err) => {
          writeLogsToTxt(err);
          throw err;
        });
    })
    .catch((err) => {
      writeLogsToTxt(err);
      throw err;
    });
};

exports.remove = (id) => {
  return Landing.deleteOne({ _id: id })
    .then((result) => result)
    .catch((err) => {
      writeLogsToTxt(err);
      throw err;
    });
};
