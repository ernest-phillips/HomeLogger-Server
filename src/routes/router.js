import {
  addNewUser,
  getUsers,
  getUserID,
  updateUser,
  deleteUser,
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
    .route("/items")
    .get(getUserID)

    .put(updateUser);
};

export default routes;
