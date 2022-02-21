const CardController = require("../controllers/card.controllers");
const { authenticate } = require("../config/jwt.config");

module.exports = (app) => {
  app.get("/api/cards", authenticate, CardController.findAllCards);
  app.post("/api/cards", authenticate, CardController.createCard);
  app.get("/api/cards/:email", authenticate, CardController.findAllCardsByUser);
  app.get("/api/cards/:id", authenticate, CardController.findOneCard);
  app.put("/api/cards/:id", authenticate, CardController.updateCard);
  app.delete("/api/cards/:id", authenticate, CardController.deleteCard);
};
