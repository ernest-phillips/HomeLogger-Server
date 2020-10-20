const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
// const passport = require("passport");
const userRouter = require("./routes/router");

const {
  addNewUser,
  getUsers,
  getUserID,
  updateUser,
  deleteUser,
} = require("./controllers/controller");

const {
  addNewItem,
  getItemID,
  getUserItem,
  getItems,
} = require("./controllers/item.controller");

const {
  addNewHome,
  getHomes,
  getHomeID,
  updateHome,
  deleteHome,
} = require("./controllers/home.controller");

const {
  PORT,
  HTTP_STATUS_CODES,
  MONGO_URL,
  TEST_MONGO_URL,
} = require("./config");

// this server used by startServer and stopServer functions
let server;
const app = express();
//MIDLEWARE
app.use(morgan("combined"));
app.use(express.json());
app.use(express.static("./public"));
app.use(express.urlencoded({ extended: true }));

let rootURL = "api/v1";
//ROUTER SETUP
// app.use("/user", function (req, res , next)
// userRouter);
app.use("/hello", function (req, res) {
  res.send("Hello world");
});

// app.use("/goodbye", function (req, res) {
//   res.send("Goodbye");
// });

app
  .route(`/user`)
  .get((req, res, next) => {
    next();
  }, getUsers)
  .post(addNewUser);
app.route(`/user/:userID`).get(getUserID).put(updateUser).delete(deleteUser);
// app
//   .route(`/items/:itemID`)
//   .get((req, res, next) => {}, getUserItem)
//   .post(addNewItem);
// app.route("/items").get(getUserItem).put(updateItem);

app.route(`/homes`).get(getHomes);
app.route(`/homes/:homeID`).get(getHomeID);
app.route(`/homes/:userID`).post(addNewHome);

app.route(`/items/:homeID`).post(addNewItem);
app.route(`/items/:itemID`).get(getItemID);
app.route(`/items`).get(getItems);

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
