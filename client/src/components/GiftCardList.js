import React from "react";

// components
import GiftCard from "./GiftCard";

const GiftCardList = (props) => {
  const {user} = props;

  return (
    <div className="card p-2">
      <h2>Gift Idea Cards</h2>
      {user.cards.map((card, index) => {
        return (
          <GiftCard card={card} key={index} />
        )
      })}
    </div>
  );
};

export default GiftCardList;
