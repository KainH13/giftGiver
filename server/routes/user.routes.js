const UserController = require("../controllers/user.controllers");
const { authenticate } = require("../config/jwt.config");

module.exports = (app) => {
    app.post("/api/users/register", UserController.register);
    app.post("/api/users/login", UserController.login);
    app.post("/api/users/logout", UserController.logout);
    app.get("/api/users", UserController.getAllUsers);
    app.get("/api/users/:email", authenticate, UserController.getOneUser);
    app.put("/api/users/:email", authenticate, UserController.updateUser);
    app.delete("/api/users/:id", UserController.deleteUser);
};
