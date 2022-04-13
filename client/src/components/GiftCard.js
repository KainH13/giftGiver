import React, { useState } from "react";
import axios from "axios";

// components
import GiftCardForm from "./GiftCardForm";

const GiftCard = (props) => {
  const { card, user, setUser, updateCardList } = props;

  // copy card into state for editing
  const [targetCard, setTargetCard] = useState(card);
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
  // TODO - when a middle element of the cards array is deleted, the entire card array is emptied on the front end
  // Middle elements should be able to delete while still showing the rest of the array to the user
  const deleteCard = (targetCard) => {
    console.log("Target Card ++++++++++++++++ ", targetCard);
    axios
      .delete(`http://localhost:8000/api/cards/${targetCard._id}`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        // remove card from user list so that it can update without a refresh
        // let userCards = user.cards;
        // console.log("User cards pre delete: ", userCards);
        // for (let i = 0; i < userCards.length; i++) {
        //   if (userCards[i]._id === targetCard._id) {
        //     userCards.splice(i, 1);
        //     break;
        //   }
        // }
        // console.log("User cards post delete: ", userCards);
        // let editedUser = { ...user };
        // console.log("Editable User: ", editedUser);
        // editedUser.cards = userCards;
        // console.log("Users Cards after edit", editedUser.cards);
        // setUser(editedUser);
        // console.log("State for user to save: ", user);
        // filter out deleted card from user.cards
        updateCardList(targetCard._id);
        setEditing(false);
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
