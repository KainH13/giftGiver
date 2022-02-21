import React from "react";

const UserCard = (props) => {
    const { user } = props;

    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">
                    {user.firstName} {user.lastName}
                </h5>
                <h4 className="card-subtitle mb-2 text-muted">{user.email}</h4>
                <p className="card-text">Interests: {user.interests[0]}</p>
                {user.customFields
                    ? user.customFields.map((field, index) => {
                            return (
                                <p className="card-text" key={index}>
                                    {field.label}: {field.body}
                                </p>
                            );
                    })
                    : null}
            </div>
        </div>
    );
};

export default UserCard;
