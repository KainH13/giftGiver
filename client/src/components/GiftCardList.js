import React, { useEffect, useState } from "react";

// components
import GiftCard from "./GiftCard";

const GiftCardList = (props) => {
  const { user, setUser } = props;

  const [sorted, setSorted] = useState(false);

  return (
    <div className="card p-3 m-2 shadow">
      <h2 className="text-muted">Gift Ideas</h2>
      {user.cards.map((card, index) => {
        return (
          <GiftCard card={card} user={user} setUser={setUser} key={index} />
        );
      })}
    </div>
  );
};

export default GiftCardList;
