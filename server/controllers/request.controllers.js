const Request = require("../models/requests.model");
const User = require("../models/user.model");
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

  acceptRequest: (req, res) => {
    Request.findOneAndUpdate({ _id: req.params.id }, 
      {
        "status": "Accepted"
      }, {
      new: true,
      runValidators: true,
    })
      .populate("sender", "_id firstName lastName friends")
      .populate("receiver", "_id firstName lastName friends")
      .then((acceptedRequest) => {
        console.log("Request accepted", acceptedRequest);
        User.findOneAndUpdate(
          { _id: acceptedRequest.receiver },
          {
            $addToSet: { friends: acceptedRequest.sender },
          },
          {
            new: true,
            useFindAndModify: true,
          }
        )
          .then((updatedUser) => {
            console.log("Receiver friend list updated successfully");
            User.findOneAndUpdate(
              { _id: acceptedRequest.sender },
              {
                $addToSet: { friends: acceptedRequest.receiver },
              },
              {
                new: true,
                useFindAndModify: true,
              }
            )
              .then((otherUser) => {
                console.log("Sender friend list updates successfully");
                res.json(acceptedRequest);
              })
              .catch((err) => {
                console.log(err);
                res.status(400).json;
              });
          })
          .catch((err) => {
            console.log(err);
            res.status(400).json(err);
          });
      })
      .catch((err) => {
        console.log("Error in acceptRequest: ", err);
        res.status(400).json(err);
      });
  },

  declineRequest: (req, res) => {
    Request.findOneAndUpdate({ _id: req.params.id }, 
      {
        "status": "Declined"
      }, {
      new: true,
      runValidators: true,
    })
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
