import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// components

const Edit = (props) => {
    const {userEmail} = props;

    const navigate = useNavigate();

    useEffect(() => {
        // check for user authentication via userEmail state
        if (userEmail === "") {
            navigate("/login");
        }
    });

    return <div>Edit</div>;
};

export default Edit;
