import React from "react";

const GiftCard = (props) => {
  const { card } = props;

  return (
    <div className="card my-2">
      <div className="card-body">
        <h3 className="card-title">
          {card.firstName} {card.lastName}
        </h3>
        <p className="card-text">Interests: {card.interests}</p>
        {card.customFields
          ? card.customFields.map((field, index) => {
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

export default GiftCard;
