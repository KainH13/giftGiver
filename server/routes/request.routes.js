const RequestController = require("../controllers/request.controllers");
const { authenticate } = require("../config/jwt.config");

module.exports = (app) => {
  app.get("/api/requests", authenticate, RequestController.findAllRequests);
  app.post("/api/requests", authenticate, RequestController.createRequest);
  app.get(
    "/api/user/requests/for",
    authenticate,
    RequestController.findAllRequestsForLoggedInUser
  );
  app.get(
    "/api/user/requests/for/uid",
    authenticate,
    RequestController.findAllOpenRequestUidsForLoggedInUser
  );
  app.get(
    "/api/user/requests/by",
    authenticate,
    RequestController.findAllRequestsByLoggedInUser
  );
  app.get(
    "/api/user/requests/by/uid",
    authenticate,
    RequestController.findAllOpenRequestUidsByLoggedInUser
  );
  app.get("/api/requests/:id", authenticate, RequestController.findOneRequest);
  app.put("/api/requests/:id", authenticate, RequestController.updateRequest);
  app.delete(
    "/api/requests/:id",
    authenticate,
    RequestController.deleteRequest
  );
  app.put(
    "/api/requests/accept/:id",
    authenticate,
    RequestController.acceptRequest
  );
  app.put(
    "/api/requests/decline/:id",
    authenticate,
    RequestController.declineRequest
  );
};
