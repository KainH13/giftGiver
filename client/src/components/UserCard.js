import React from "react";

const UserCard = (props) => {
  const { user } = props;

  return (
    <div className="card">
      <div className="card-body">
        <h3 className="card-title">
          {user.firstName} {user.lastName}
        </h3>
        <h5 className="card-subtitle mb-2 text-muted">{user.email}</h5>
        <p className="card-text"><span className="fw-bold">Interests:</span> {user.interests}</p>
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
    </div>
  );
};

export default UserCard;
