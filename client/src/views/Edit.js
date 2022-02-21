import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// components
import Navbar from "../components/Navbar";
import UserInfoForm from "../components/UserInfoForm";

const Edit = (props) => {
  const { userEmail, setUserEmail } = props;

  // saving form inputs
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    interests: "",
    customFields: [],
  });

  // validation errors
  const [errors, setErrors] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    // check for user authentication via userEmail state
    if (userEmail === "") {
      navigate("/login");
    }

    // populate user data
    axios
      .get(`http://localhost:8000/api/users/${userEmail}`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        setUser({
          firstName: res.data.firstName,
          lastName: res.data.lastName,
          interests: res.data.interests,
          customFields: res.data.customFields,
        });
        console.log(user);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }, []);

  // submit handler that's passed to UserInfoForm
  const updateUser = (user) => {
    axios
      .put(`http://localhost:8000/api/users/${userEmail}`, user, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        navigate("/home");
      })
      .catch((err) => {
        console.log(err.response.data);
        setErrors(err.response.data.errors);
      });
  };

  return (
    <div>
      <Navbar userEmail={userEmail} setUserEmail={setUserEmail} />
      <UserInfoForm user={user} setUser={setUser} onSubmitAction={updateUser} errors={errors} />
    </div>
  );
};

export default Edit;
