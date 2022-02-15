const CardController = require("../controllers/card.controllers");

module.exports = (app) => {
    app.get("/api/cards", CardController.findAllCards);
    app.post("/api/cards", CardController.createCard);
    app.get("/api/cards/:id", CardController.findOneCard);
    app.put("/api/cards/:id", CardController.updateCard);
    app.delete("/api/cards/:id", CardController.deleteCard);
};