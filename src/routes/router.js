import {
  addNewUser,
  getUsers,
  getUserID,
  updateUser,
  deleteUser,
  getItems,
  addNewItem,
  getItemID,
} from "../controllers/controller";

const routes = (app) => {
  app
    .route(`/user`)
    .get((req, res, next) => {
      // middleware
      console.log(`request from: ${req.originalURL}`);
      console.log(`Request type: ${req.method}`);
      next();
    }, getUsers)

    .post(addNewUser);

  app
    .route("/user/:userID")
    .get(getUserID)

    .put(updateUser)

    .delete(deleteUser);

  app
    .route(`/items`)
    .get((req, res, next) => {
      // middleware
      console.log(`request from: ${req.originalURL}`);
      console.log(`Request type: ${req.method}`);
      next();
    }, getItems)

    .post(addNewItem);

  app.route("/items").get(getItems);

  // .put(updateItem);

  app.route("/items/:itemID").get(getItemID);
};

export default routes;
