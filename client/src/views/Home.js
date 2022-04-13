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
    _id: "",
    firstName: "",
    lastName: "",
    email: "",
    interests: [],
    customFields: [],
    cards: [],
    comments: [],
  });

  const updateCardList = (id) => {
    const updatedCards = user.cards.filter((card) => card._id !== id);
    console.log("Updated Cards ========================= ", updatedCards);
    setUser((prevState) => {
      return { ...prevState, cards: updatedCards };
    });
  };

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
        setUser(res.data);
        setConnections(res.data.friends);
        setCard({
          firstName: "",
          lastName: "",
          interests: "",
          customFields: [],
          createdBy: res.data._id,
        });
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
        setUser({ ...user, cards: [...user.cards, res.data] });
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

  // custom sorting function to sort alphabetically by a field in an array of objects
  const dynamicSort = (field) => {
    let sortOrder = 1;

    if (field[0] === "-") {
      sortOrder = -1;
      field = field.substr(1);
    }

    return function (a, b) {
      if (sortOrder === -1) {
        return b[field].localeCompare(a[field]);
      } else {
        return a[field].localeCompare(b[field]);
      }
    };
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
            <ConnectionSearch
              connections={connections}
              setConnections={setConnections}
              dynamicSort={dynamicSort}
            />
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
            <GiftCardList
              user={user}
              setUser={setUser}
              updateCardList={updateCardList}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
