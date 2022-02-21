import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
        console.log(user);
        console.log(user.firstName);
    });

    return (
        <div>
          <Navbar userEmail={userEmail} setUserEmail={setUserEmail} />
          <UserInfoForm user={user} setUser={setUser} errors={errors} />
        </div>
    );
};

export default Edit;
