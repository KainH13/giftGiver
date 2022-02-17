import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// components
import Navbar from "../components/Navbar";

const Home = (props) => {
    const { userEmail, setUserEmail, setAuthenticated } = props;

    const navigate = useNavigate();

    useEffect(() => {
        // check for user authentication via userEmail state
        if (userEmail === "") {
            navigate("/login");
        }
    });

    return (
        <div>
            <Navbar
                userEmail={userEmail}
                setAuthenticated={setAuthenticated}
                setUserEmail={setUserEmail}
            />
        </div>
    );
};

export default Home;
