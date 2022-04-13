import React, { useEffect, useState } from "react";

// components
import GiftCard from "./GiftCard";

const GiftCardList = (props) => {
  const { user, setUser, updateCardList } = props;

  console.log("+++++++++++++User Cards++++++++++++++");
  console.log(user.cards);

  return (
    <div className="card p-3 m-2 shadow">
      <h2 className="text-muted">Gift Ideas</h2>
      {user.cards.map((card, index) => {
        return (
          <GiftCard
            card={card}
            user={user}
            setUser={setUser}
            updateCardList={updateCardList}
            key={index}
          />
        );
      })}
    </div>
  );
};

export default GiftCardList;
