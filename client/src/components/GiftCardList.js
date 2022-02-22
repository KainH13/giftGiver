import React, { useEffect, useState } from "react";

// components
import GiftCard from "./GiftCard";

const GiftCardList = (props) => {
  const { user, setUser } = props;

  const [sorted, setSorted] = useState(false);

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
