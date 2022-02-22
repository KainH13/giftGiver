import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// components
import Navbar from "../components/Navbar";
import UserCard from "../components/UserCard";
import GiftCardForm from "../components/GiftCardForm";
import GiftCardList from "../components/GiftCardList";

const Home = (props) => {
  const { userEmail, setUserEmail, setAuthenticated } = props;

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

  const navigate = useNavigate();

  useEffect(() => {
    // check for user authentication via userEmail state
    if (userEmail === "") {
      navigate("/login");
    }

    axios
      .get(`http://localhost:8000/api/users/${userEmail}`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        setUser({
          id: res.data._id,
          firstName: res.data.firstName,
          lastName: res.data.lastName,
          email: res.data.email,
          interests: res.data.interests,
          customFields: res.data.customFields,
          cards: res.data.cards,
          comments: res.data.comments,
        });
        console.log(user);
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
        console.log(res.data);
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
      <Navbar
        userEmail={userEmail}
        setAuthenticated={setAuthenticated}
        setUserEmail={setUserEmail}
      />
      <div className="row m-2">
        <div className="col-5">
          <UserCard user={user} />
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
            <GiftCardList user={user} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
