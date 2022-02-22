import React, { useState } from "react";
import axios from "axios";

// components
import GiftCardForm from "./GiftCardForm";

const GiftCard = (props) => {
  const { card, user, setUser } = props;

  // copy card into state for editing
  const [targetCard, setTargetCard] = useState({ ...card });
  const [errors, setErrors] = useState([]);

  // editing switch
  const [editing, setEditing] = useState(false);

  // update card in db
  const updateCard = (targetCard) => {
    axios
      .put(`http://localhost:8000/api/cards/${targetCard._id}`, card, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        setEditing(false);
      })
      .catch((err) => {
        console.log(err.response.data);
        setErrors(err.response.data.errors);
      });
  };

  // delete card in db and remove from user cards list so no refresh is required to see the change BROKEN
  const deleteCard = (targetCard) => {
    axios
      .delete(`http://localhost:8000/api/cards/${targetCard._id}`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        // remove card from user list so that it can update without a refresh
        let userCards = [...user.cards];
        console.log("Editable User Cards: ", userCards.cards);
        console.log("Target Card: ", targetCard);
        console.log("User cards length: ", userCards.length);
        for (let i = 0; i < userCards.length; i++) {
          if (userCards[i]._id === targetCard._id) {
            userCards.splice(i);
            break;
          }
        }
        let editedUser = { ...user };
        editedUser.cards = userCards;
        setUser(editedUser);
        console.log("User after delete:", user);
      })
      .catch((err) => {
        console.log(err.response.data);
        setErrors(err.response.data.errors);
      });
  };

  return (
    <div className="card my-2 shadow">
      {editing ? (
        <GiftCardForm
          card={targetCard}
          setCard={setTargetCard}
          onSubmitAction={updateCard}
          errors={errors}
          deleteAction={deleteCard}
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
