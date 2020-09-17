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
  getUserItem,
} from "../controllers/item.controller";

const routes = (app) => {
  app
    .route(`/user`)
    .get((req, res, next) => {
      next();
    }, getUsers)
    .post(addNewUser);

  app.route("/user/:userID").get(getUserID).put(updateUser).delete(deleteUser);

  app
    .route(`/user/:userID/items`)
    .get((req, res, next) => {}, getUserItem)
    .post(addNewItem);

  // app.route("/items").get(getUserItems);

  // .put(updateItem);

  // app.route("/items/:itemID").get(getItemID);
};

export default routes;
import { HTTP_STATUS_CODES } from "../config";

// const userRouter
