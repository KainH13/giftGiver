import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// components
import Navbar from "../components/Navbar";
import UserCard from "../components/UserCard";
import GiftCardForm from "../components/GiftCardForm";
import GiftCardList from "../components/GiftCardList";
import ConnectionSearch from "../components/ConnectionSearch";

const Home = (props) => {
  const { userEmail, setUserEmail } = props;

  // setting state for card creation and update
  const [card, setCard] = useState({
    firstName: "",
    lastName: "",
    interests: "",
    customFields: [],
    createdBy: "",
  });

  const [errors, setErrors] = useState([]);

  // setting state for displaying user information
  const [user, setUser] = useState({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    interests: [],
    customFields: [],
    cards: [],
    comments: [],
  });

  // set connections for connection search component
  const [connections, setConnections] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    // check for user authentication via userEmail state
    if (userEmail === "") {
      navigate("/login");
    }

    // get logged in user data
    axios
      .get(`http://localhost:8000/api/user`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        setUser({
          _id: res.data._id,
          firstName: res.data.firstName,
          lastName: res.data.lastName,
          email: res.data.email,
          interests: res.data.interests,
          customFields: res.data.customFields,
          cards: res.data.cards,
          comments: res.data.comments,
          friends: res.data.friends,
        });
        console.log(user);
        setConnections(res.data.friends);
        console.log(connections);
        setCard({
          firstName: "",
          lastName: "",
          interests: "",
          customFields: [],
          createdBy: res.data._id,
        });
        console.log(card);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }, []);

  // card creation
  const createCard = (card) => {
    axios
      .post("http://localhost:8000/api/cards", card, {
        withCredentials: true,
      })
      .then((res) => {
        console.log("Newly Created Card: ", res.data);
        // add card to users cards list for display
        user.cards = [...user.cards, res.data];
        // clear form fields out for re-use
        setCard({
          firstName: "",
          lastName: "",
          interests: "",
          customFields: [],
          createdBy: user.id,
        });
        setErrors([]);
      })
      .catch((err) => {
        console.log(err.response.data);
        setErrors(err.response.data.errors);
      });
  };

  return (
    <div>
      <Navbar userEmail={userEmail} setUserEmail={setUserEmail} />
      <div className="row mx-3">
        <div className="col-5">
          <div className="row">
            <UserCard user={user} connectionStatus={"user"} />
          </div>
          <div className="row">
            <ConnectionSearch connections={connections} setConnections={setConnections} />
          </div>
        </div>
        <div className="col-7">
          <div className="row">
            <GiftCardForm
              card={card}
              setCard={setCard}
              onSubmitAction={createCard}
              errors={errors}
              action="Create"
            />
          </div>
          <div className="row">
            <GiftCardList user={user} setUser={setUser} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
