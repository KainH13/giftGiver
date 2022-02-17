import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// components

const Connections = (props) => {
    const {userEmail} = props;

    const navigate = useNavigate();

    useEffect(() => {
        // check for user authentication via userEmail state
        if (userEmail === "") {
            navigate("/login");
        }
    });

    return <div>Connections</div>;
};

export default Connections;
