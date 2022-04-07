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

  const navigate = useNavigate();

  useEffect(() => {
    // check for user authentication via userEmail state
    if (userEmail === "") {
      navigate("/login");
    }
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
            if (user.email !== userEmail) {
              return <UserCard user={user} key={index} />;
            } else {
              return null;
            }
          })
          : null
        }
      </div>
    </div>
  );
};

export default UserSearch;
