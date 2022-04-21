import React, { useState } from "react";
import axios from "axios";

const UserCard = (props) => {
  const { user, connectionStatus } = props;

  const [status, setStatus] = useState(connectionStatus);

  // TODO - Add button logic for request actions
  const createRequest = (e) => {
    axios
      .post(
        "http://localhost:8000/api/requests",
        {
          receiver: user._id,
        },
        { withCredentials: true }
      )
      .then((res) => {
        setStatus("pendingBy");
      })
      .catch((err) => {
        console.log(
          "Error in creating connection request: ",
          err.response.data
        );
      });
  };

  return (
    <div className="card my-2 shadow">
      <div className="card-body">
        <div className="row">
          <div className="col-10">
            <h3 className="card-title text-primary">
              {user.firstName} {user.lastName}
            </h3>
            <h5 className="card-subtitle mb-2 text-muted">{user.email}</h5>
            {user.interests ? (
              <p className="card-text">
                <span className="fw-bold">Interests:</span> {user.interests}
              </p>
            ) : null}
            {user.customFields
              ? user.customFields.map((field, index) => {
                  return (
                    <p className="card-text" key={index}>
                      <span className="fw-bold">{field.label}:</span>{" "}
                      {field.body}
                    </p>
                  );
                })
              : null}
          </div>
          <div className="col-1 d-flex align-items-start justify-content-center">
            {status === "none" ? (
              <button
                className="btn btn-outline-primary"
                onClick={createRequest}
              >
                Connect
              </button>
            ) : null}
            {status === "pendingFor" ? (
              <div>
                <button className="btn btn-outline-success mb-2">Accept</button>
                <button className="btn btn-outline-danger">Decline</button>
              </div>
            ) : null}
            {status === "pendingBy" ? (
              <button className="btn btn-outline-warning">Pending</button>
            ) : null}
            {status === "accepted" ? (
              <button className="btn btn-outline-danger">Remove</button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
