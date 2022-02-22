import React from "react";
import axios from "axios";

// components
import GiftCard from "./GiftCard";

const GiftCardList = (props) => {
  const { user, setUser } = props;

  return (
    <div className="card p-2">
      <h2>Gift Idea Cards</h2>
      {user.cards.map((card, index) => {
        return (
          <GiftCard card={card} user={user} setUser={setUser} key={index} />
        );
      })}
    </div>
  );
};

export default GiftCardList;
