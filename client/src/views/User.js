import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// components

const User = (props) => {
  const navigate = useNavigate();

  useEffect(() => {
    // check for user authentication via userEmail state
    if (localStorage.getItem("loggedIn") !== "true") {
      navigate("/login");
    }
  });

  return <div>User</div>;
};

export default User;
