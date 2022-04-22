import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// components
import Navbar from "../components/Navbar";
import UserCard from "../components/UserCard";
import GiftCardForm from "../components/GiftCardForm";
import GiftCardList from "../components/GiftCardList";
import Connections from "../components/Connections";

const Home = (props) => {
  // setting state for card creation and update
  const [card, setCard] = useState({
    firstName: "",
    lastName: "",
    interests: "",
    customFields: [],
    createdBy: "",
  });

  // removed card IDs so they aren't rendered
  const [removedCards, setRemovedCards] = useState([]);

  // error handling for gift idea card creation
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

  // set connections for connection search component
  const [connections, setConnections] = useState([]);

  // loaded state for components that need to wait until certain slower data is loaded to render
  const [loaded, setLoaded] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    // check for user authentication via userEmail state
    if (localStorage.getItem("loggedIn") !== "true") {
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
        setLoaded(true);
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
        // unload GiftCardList component
        setLoaded(false);
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
        // reload GiftCardList
        setLoaded(true);
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
      <Navbar />
      <div className="row mx-3">
        <div className="col-5">
          <div className="row">
            <UserCard user={user} connectionStatus={"user"} />
          </div>
          <div className="row">
            <Connections
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
            {loaded ? (
              <GiftCardList
                user={user}
                dynamicSort={dynamicSort}
                removedCards={removedCards}
                setRemovedCards={setRemovedCards}
              />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
