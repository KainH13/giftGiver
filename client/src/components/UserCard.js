import React from "react";

const UserCard = (props) => {
  const { user, connectionStatus } = props;

  // TODO -- add 2 rows and add friend request button to second row
  return (
    <div className="card my-2 shadow">
      <div className="card-body">
        <div className="row">
          <div className="col-10">
            <h3 className="card-title text-primary">
              {user.firstName} {user.lastName}
            </h3>
            <h5 className="card-subtitle mb-2 text-muted">{user.email}</h5>
            {user.interests
              ? <p className="card-text"><span className="fw-bold">Interests:</span> {user.interests}</p>
              : null
            }
            {user.customFields
              ? user.customFields.map((field, index) => {
                  return (
                    <p className="card-text" key={index}>
                      <span className="fw-bold">{field.label}:</span> {field.body}
                    </p>
                  );
                })
              : null}
          </div>
          <div className="col-1 d-flex align-items-start justify-content-center">
            {connectionStatus === "none" ?
            <button className="btn btn-outline-primary">Connect</button>
            : null
            }
            {connectionStatus === "pendingFor" ?
            <div>
              <button className="btn btn-outline-success">Accept</button>
              <button className="btn btn-outline-danger">Decline</button>
            </div>
            : null
            }
            {connectionStatus === "pendingBy" ?
            <button className="btn btn-outline-primary">Pending</button>
            : null
            }
            {connectionStatus === "accepted" ?
            <button className="btn btn-outline-danger">Remove</button>
            : null
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
