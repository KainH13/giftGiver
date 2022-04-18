import React, { useEffect, useState } from "react";
import axios from "axios";

// components
import GiftCard from "./GiftCard";

const GiftCardList = (props) => {
  const { cards, dynamicSort } = props;

  const [userCards, setUserCards] = useState([]);
  const [removedCards, setRemovedCards] = useState([]);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    // sort cards by firstName
    let tempArray = cards;
    tempArray.sort(dynamicSort("firstName"));
    setUserCards(tempArray);
    console.log("User Cards: ", userCards);
  }, []);

  // update card in db
  const updateCard = (targetCard) => {
    axios
      .put(`http://localhost:8000/api/cards/${targetCard._id}`, targetCard, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
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
    console.log("Target Card: ", targetCard);
    axios
      .delete(`http://localhost:8000/api/cards/${targetCard._id}`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        setRemovedCards([...removedCards, targetCard._id]);
      })
      .catch((err) => {
        console.log(err.response.data);
        setErrors(err.response.data.errors);
      });
  };

  return (
    <div className="card p-3 m-2 shadow">
      <h2 className="text-muted">Gift Ideas</h2>
      {userCards.map((card, index) => {
        if (removedCards.includes(card._id)) {
          return null;
        }

        return (
          <GiftCard
            card={card}
            errors={errors}
            updateCard={updateCard}
            deleteCard={deleteCard}
            key={index}
          />
        );
      })}
    </div>
  );
};

export default GiftCardList;
