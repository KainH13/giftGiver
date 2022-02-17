import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// components

const User = (props) => {
    const { userEmail } = props;

    const navigate = useNavigate();

    useEffect(() => {
        // check for user authentication via userEmail state
        if (userEmail === "") {
            navigate("/login");
        }
    });

    return <div>User</div>;
};

export default User;
