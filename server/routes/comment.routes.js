const CommentController = require("../controllers/comment.controllers");

module.exports = (app) => {
    app.get("/api/comments", CommentController.findAllComments);
    app.post("/api/comments", CommentController.createComment);
    app.get("/api/comments/:id", CommentController.findOneComment);
    app.put("/api/comments/:id", CommentController.updateComment);
    app.delete("/api/comments/:id", CommentController.deleteComment);
};