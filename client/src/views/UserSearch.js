import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// components
import Navbar from "../components/Navbar";

const UserSearch = (props) => {
  const { userEmail, setUserEmail } = props;

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

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
          class="form-control me-2"
          name="searchTerm"
          type="search"
          placeholder="Search"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          class="btn btn-outline-success"
          type="submit"
          onClick={searchUsers}
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default UserSearch;
