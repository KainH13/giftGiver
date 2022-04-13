import React, { useState } from "react";

// components
import GiftCardForm from "./GiftCardForm";

const GiftCard = (props) => {
  const { card, updateCard, deleteCard, errors } = props;

  // copy card into state for editing
  const [targetCard, setTargetCard] = useState(card);

  // editing switch
  const [editing, setEditing] = useState(false);

  return (
    <div className="card my-2 shadow">
      {editing ? (
        <GiftCardForm
          card={targetCard}
          setCard={setTargetCard}
          onSubmitAction={(targetCard) => {
            updateCard(targetCard);
            setEditing(false);
          }}
          errors={errors}
          deleteAction={(targetCard) => {
            deleteCard(targetCard);
            setEditing(false);
          }}
          action="Edit"
        />
      ) : (
        <div className="card-body">
          <div className="row">
            <div className="col-10">
              <h3 className="card-title text-success">
                {targetCard.firstName} {targetCard.lastName}
              </h3>
            </div>
            <div className="col-1 ms-4">
              <button
                className="btn btn-outline-primary"
                onClick={(e) => setEditing(!editing)}
              >
                Edit
              </button>
            </div>
          </div>
          <p className="card-text">
            <span className="fw-bold">Interests:</span> {targetCard.interests}
          </p>
          {targetCard.customFields
            ? targetCard.customFields.map((field, index) => {
                return (
                  <p className="card-text" key={index}>
                    <span className="fw-bold">{field.label}:</span> {field.body}
                  </p>
                );
              })
            : null}
        </div>
      )}
    </div>
  );
};

export default GiftCard;
