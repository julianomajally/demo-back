require("dotenv").config();
const cors = require("cors");
const express = require("express");
const router = express.Router();
const app = express();
const server = require("http").createServer(app);

const RoutesConfig = require("./src/routes/routes.config.js");

app.use(function (err, req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,PUT,PATCH,POST,DELETE");
  res.header("Access-Control-Expose-Headers", "Content-Length");
  res.header(
    "Access-Control-Allow-Headers",
    "Accept, Authorization, Content-Type, X-Requested-With, Range"
  );
  if (req.method === "OPTIONS") {
    return res.send(200);
  } else {
    console.log("This is the invalid field ->", err.field);
    next(err);
  }
});

// for parsing application/json
app.use(express.json());
// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));

app.use(cors());

app.get("/", (req, res) => {
  res.status(204).send();
});

app.use(function (req, res, next) {
  next();
});

app.use("/api", router);

RoutesConfig.routesConfig(router);

server.listen(process.env.PORT, function () {
  // Get active calls on server startup
  console.log("App listening at port %s", process.env.PORT);
});
