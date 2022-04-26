import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// components
import Navbar from "../components/Navbar";
import UserCard from "../components/UserCard";

const UserSearch = (props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  const [friends, setFriends] = useState([]);
  const [requestsForUser, setRequestsForUser] = useState([]);
  const [requestIdsForUser, setRequestIdsForUser] = useState([]);
  const [requestsByUser, setRequestsByUser] = useState([]);
  const [requestIdsByUser, setRequestIdsByUser] = useState([]);

  // for making sure results don't load before state is completely set
  const [loaded, setLoaded] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    // check for user authentication via userEmail state
    if (localStorage.getItem("loggedIn") !== "true") {
      navigate("/login");
    }

    // get logged in user's friends
    axios
      .get("http://localhost:8000/api/user", {
        withCredentials: true,
      })
      .then((res) => {
        console.log("Logged in User: ", res.data);
        let output = [];
        res.data.friends.forEach((friend) => {
          output.push(friend._id);
        });
        setFriends(output);
      })
      .catch((err) => {
        console.log(
          "Error in getting logged in user information: ",
          err.response.data
        );
      });

    // get requests by user
    axios
      .get("http://localhost:8000/api/user/requests/for/uid", {
        withCredentials: true,
      })
      .then((res) => {
        setRequestsForUser(res.data.senders);
        setRequestIdsForUser(res.data.requestIds);
      })
      .catch((err) => {
        console.log(
          "Error in getting open requests for user: ",
          err.response.data
        );
      });

    // get requests for user
    axios
      .get("http://localhost:8000/api/user/requests/by/uid", {
        withCredentials: true,
      })
      .then((res) => {
        setRequestsByUser(res.data.receivers);
        setRequestIdsByUser(res.data.requestIds);
        setLoaded(true);
      })
      .catch((err) => {
        console.log(
          "Error in getting open requests by user: ",
          err.response.data
        );
      });
  }, []);

  const searchUsers = (e) => {
    e.preventDefault();
    axios
      .get(`http://localhost:8000/api/users/search/${searchTerm}`, {
        withCredentials: true,
      })
      .then((res) => {
        setLoaded(false); // wait on loading until search results are set into state
        setSearchResults(res.data);
        console.log("Search Results: ", searchResults);
        setLoaded(true); // reload results once set into state to avoid state bleed from partial loading
      })
      .catch((err) => {
        console.log("Error in user search: ", err.response.data);
      });
  };

  return (
    <div>
      <Navbar />
      <div className="row mx-3">
        <div className="col-6">
          <h2 className="text-muted text-center">Search For Connections</h2>
          <form className="d-flex mx-2">
            <input
              className="form-control me-2 shadow"
              name="searchTerm"
              type="search"
              placeholder="Search"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              className="btn btn-outline-primary shadow"
              type="submit"
              onClick={searchUsers}
            >
              Search
            </button>
          </form>
          <div className="mx-2">
            {searchResults && loaded
              ? searchResults.map((user, index) => {
                  // don't display logged in user in results
                  if (user._id === localStorage.getItem("userID")) {
                    return null;
                  }
                  // Check the users relationship to the logged in user to determine connection request button functionality
                  // TODO -- O(n^2) time complexity in worse cases, should look for a more time efficient solutions to these checks
                  if (requestsForUser.includes(user._id)) {
                    let requestId =
                      requestIdsForUser[requestsForUser.indexOf(user._id)];
                    return (
                      <UserCard
                        user={user}
                        requestId={requestId}
                        connectionStatus={"pendingFor"}
                        key={index}
                      />
                    );
                  }
                  if (requestsByUser.includes(user._id)) {
                    let requestId =
                      requestIdsByUser[requestsByUser.indexOf(user._id)];
                    return (
                      <UserCard
                        user={user}
                        requestId={requestId}
                        connectionStatus={"pendingBy"}
                        key={index}
                      />
                    );
                  }
                  if (friends.includes(user._id)) {
                    return (
                      <UserCard
                        user={user}
                        connectionStatus={"accepted"}
                        key={index}
                      />
                    );
                  } else {
                    return (
                      <UserCard user={user} connectionStatus={"none"} key={index} />
                    );
                  }
                })
              : null}
          </div>
        </div>
        <div className="col-6">
          <h2 className="text-muted text-center">Connection Requests</h2>
        </div>
      </div>
    </div>
  );
};

export default UserSearch;
