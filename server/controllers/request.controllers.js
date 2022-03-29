const Request = require("../models/requests.model");
const jwt = require("jsonwebtoken");

module.exports = {
  findAllRequests: (req, res) => {
    Request.find()
      .then((allRequests) => {
        console.log(allRequests);
        res.json(allRequests);
      })
      .catch((err) => {
        console.log("Find All failed");
        res.status(400).json(err);
      });
  },

  findAllRequestsForLoggedInUser: (req, res) => {
    Request.find({ receiver: req.jwtpayload.id })
      .then((requests) => {
        console.log("Requests for User: ", requests);
        res.json(requests);
      })
      .catch((err) => {
        console.log("findAllRequestsForLoggedInUser Error");
        res.status(400).json(err);
      });
  },

  findAllRequestsByLoggedInUser: (req, res) => {
    Request.find({ sender: req.jwtpayload.id })
      .then((requests) => {
        console.log("Requests by User: ", requests);
        res.json(requests);
      })
      .catch((err) => {
        console.log("findAllRequestsByLoggedInUser Error");
        res.status(400).json(err);
      });
  },

  findOneRequest: (req, res) => {
    Request.findOne({ _id: req.params.id })
      .then((oneRequest) => {
        console.log(oneRequest);
        res.json(oneRequest);
      })
      .catch((err) => {
        console.log("Find One failed");
        res.status(400).json(err);
      });
  },

  createRequest: (req, res) => {
    Request.create(req.body)
      .then((newlyCreatedRequest) => {
        console.log(newlyCreatedRequest);
        res.json(newlyCreatedRequest);
      })
      .catch((err) => {
        console.log("Request creation failed");
        res.status(400).json(err);
      });
  },

  updateRequest: (req, res) => {
    Request.findOneAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
      runValidators: true,
    })
      .then((likeAdded) => {
        console.log("Request updated successfully");
        res.json(likeAdded);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  deleteRequest: (req, res) => {
    Request.deleteOne({ _id: req.params.id })
      .then((result) => {
        console.log(result);
        res.json(result);
      })
      .catch((err) => {
        console.log("Request delete failed");
        res.status(400).json(err);
      });
  },
};
