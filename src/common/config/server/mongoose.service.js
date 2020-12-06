const mongoose = require("mongoose");

const options = {
  autoIndex: false, // Don't build indexes
  poolSize: 10, // Maintain up to 10 socket connections
  // If not connected, return errors immediately rather than waiting for reconnect
  bufferMaxEntries: 0,
  //geting rid off the depreciation errors
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
};

const config = {
  database: "",
  user: "",
  pass: "",
};

const connectWithRetry = () => {
  console.log("MongoDB trying to connect..");
  const connectionString = process.env.DB_HOST;
  mongoose
    .connect(connectionString, options)
    .then(() => console.log("MongoDB is connected"))
    .catch((err) => {
      console.log("MongoDB connection unsuccessful, err: " + err);
    });
};

connectWithRetry();

exports.mongoose = mongoose;
