import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// components

const UserSearch = (props) => {
  const { userEmail } = props;

  const navigate = useNavigate();

  useEffect(() => {
    // check for user authentication via userEmail state
    if (userEmail === "") {
      navigate("/login");
    }
  }, []);

  return <div>UserSearch</div>;
};

export default UserSearch;
