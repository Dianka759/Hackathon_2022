const UserController = require('../controllers/user.controller');
const { authenticate } = require('../config/jwt.config');

module.exports = app => {
  app.get("/api/users", authenticate, UserController.getAllUsers)
  app.post("/api/users/register", UserController.registerUser)
  app.post("/api/users/login", UserController.login)
  app.get("/api/users/getloggedinuser", UserController.getLoggedInUser)
  app.get("/api/users/logout", UserController.logout)

  app.delete("/api/users/delete/:_id", UserController.deleteAnExistingUser);
  app.patch("/api/users/update/:_id", UserController.updateExistingUser);
}