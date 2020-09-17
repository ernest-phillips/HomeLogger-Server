const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const passport = require("passport");

const {
  PORT,
  HTTP_STATUS_CODES,
  MONGO_URL,
  TEST_MONGO_URL,
} = require("./config");

let router = express.Router();

// const { authRouter } = require("./auth/auth.router");

// this server used by startServer and stopServer functions
let server;
const app = express(); //Initialize express server
// passport.use(localStrategy);
// passport.use(jwtStrategy);

//MIDLEWARE
app.use(morgan("combined"));
app.use(express.json());
app.use(express.static("./public"));
app.use(express.urlencoded({ extended: true }));

//ROUTER SETUP
app.use("/hello", function (req, res) {
  res.send("Hello world");
});

app.use("/goodbye", function (req, res) {
  res.send("Goodbye");
});
// app.use("/api/auth", authRouter);

app.use(
  express.static("./public", {
    extensions: ["html", "htm"],
    // Other options here
  })
);

app.use("*", function (req, res) {
  res.status(HTTP_STATUS_CODES.NOT_FOUND).json({
    error: "Not Found.",
  });
});

module.exports = {
  app,
  startServer,
  stopServer,
};

function startServer(testEnv) {
  return new Promise((resolve, reject) => {
    let mongoUrl;

    if (testEnv) {
      mongoUrl = TEST_MONGO_URL;
    } else {
      mongoUrl = MONGO_URL;
    }
    mongoose.connect(
      mongoUrl,
      { useUnifiedTopology: true, useNewUrlParser: true },
      (err) => {
        if (err) {
          console.error(err);
          return reject(err);
        } else {
          server = app
            .listen(PORT, () => {
              console.log(
                `Express server listening on http://localhost:${PORT}`
              );
              resolve();
            })
            .on("error", (err) => {
              mongoose.disconnect();
              console.error(err);
              reject(err);
            });
        }
      }
    );
  });
}

function stopServer() {
  return mongoose.disconnect().then(
    () =>
      new Promise((resolve, reject) => {
        server.close((err) => {
          if (err) {
            console.error(err);
            return reject(err);
          } else {
            console.log("Express server stopped");
            resolve();
          }
        });
      })
  );
}
