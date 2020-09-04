import {
  addNewUser,
  getUsers,
  getUserID,
  updateUser,
  deleteUser,
} from "../controllers/controller";
import {
  // getUserItems,
  addNewItem,
  getItemID,
  getUserItems,
} from "../controllers/item.controller";

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
    .route(`/user/:userID/items`)
    .get((req, res, next) => {
      // middleware
      console.log(`request from: ${req.originalURL}`);
      console.log(`Request type: ${req.method}`);
      next();
    }, getUserItems)

    .post(addNewItem);

  // app.route("/items").get(getUserItems);

  // .put(updateItem);

  // app.route("/items/:itemID").get(getItemID);
};

export default routes;
