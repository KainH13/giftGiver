import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// components
import Navbar from "../components/Navbar";
import UserCard from "../components/UserCard";

const UserSearch = (props) => {
  const { userEmail, setUserEmail } = props;

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  const [friends, setFriends] = useState([]);
  const [requestsForUser, setRequestsForUser] = useState([]);
  const [requestsByUser, setRequestsByUser] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    // check for user authentication via userEmail state
    if (userEmail === "") {
      navigate("/login");
    }

    // get logged in user's friends
    axios
      .get("http://localhost:8000/api/user", {
        withCredentials: true,
      })
      .then((res) => {
        console.log("Logged in User: ", res.data);
        setFriends(res.data.friends);
      })
      .catch((err) => {
        console.log(
          "Error in getting logged in user information: ",
          err.response.data
        );
      });

    // get requests by user
    axios
      .get("http://localhost:8000/api/user/requests/for", {
        withCredentials: true,
      })
      .then((res) => {
        setRequestsForUser(res.data);
      })
      .catch((err) => {
        console.log("Error in getting requests for user: ", err.response.data);
      });

    // get requests for user
    axios
      .get("http://localhost:8000/api/user/requests/by", {
        withCredentials: true,
      })
      .then((res) => {
        setRequestsByUser(res.data);
      })
      .catch((err) => {
        console.log("Error in getting requests by user: ", err.response.data);
      });
  }, []);

  const searchUsers = (e) => {
    e.preventDefault();
    axios
      .get(`http://localhost:8000/api/users/search/${searchTerm}`, {
        withCredentials: true,
      })
      .then((res) => {
        setSearchResults(res.data);
        console.log("Search Results: ", searchResults);
      })
      .catch((err) => {
        console.log("Error in user search: ", err.response.data);
      });
  };

  return (
    <div>
      <Navbar userEmail={userEmail} setUserEmail={setUserEmail} />
      <form class="d-flex mx-2">
        <input
          class="form-control me-2 shadow"
          name="searchTerm"
          type="search"
          placeholder="Search"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          class="btn btn-outline-primary shadow"
          type="submit"
          onClick={searchUsers}
        >
          Search
        </button>
      </form>
      <div className="mx-2">
        {searchResults
          ? searchResults.map((user, index) => {
              // don't display logged in user in results
              if (user.email === userEmail) {
                return null;
              }
              // Check the users relationship to the logged in user to determine connection request button functionality
              // TODO -- O(n^2) time complexity in worse cases, should look for a more time efficient solutions to these checks
              requestsForUser.forEach((request) => {
                if (user._id === request._id) {
                  return (
                    <UserCard
                      user={user}
                      connectionStatus={"pendingFor"}
                      key={index}
                    />
                  );
                }
              });

              requestsByUser.forEach((request) => {
                if (user._id === request._id) {
                  return (
                    <UserCard
                      user={user}
                      connectionStatus={"pendingBy"}
                      key={index}
                    />
                  );
                }
              });

              friends.forEach((friend) => {
                if (user._id === friend._id) {
                  return (
                    <UserCard
                      user={user}
                      connectionStatus={"accepted"}
                      key={index}
                    />
                  );
                }
              });

              return (
                <UserCard user={user} connectionStatus={"none"} key={index} />
              );
            })
          : null}
      </div>
    </div>
  );
};

export default UserSearch;
