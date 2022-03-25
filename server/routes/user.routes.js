const UserController = require("../controllers/user.controllers");
const { authenticate } = require("../config/jwt.config");

module.exports = (app) => {
  // authentication
  app.post("/api/users/register", UserController.register);
  app.post("/api/users/login", UserController.login);
  app.post("/api/users/logout", UserController.logout);
  // get and update users
  app.get("/api/users", authenticate, UserController.getAllUsers);
  app.get("/api/users/:email", authenticate, UserController.getOneUser);
  app.put("/api/users/:email", authenticate, UserController.updateUser);
  // delete for testing
  app.delete("/api/users/:id", UserController.deleteUser);
  // user search
  app.get(
    "/api/users/search/:searchTerm",
    authenticate,
    UserController.searchUsers
  );
};
