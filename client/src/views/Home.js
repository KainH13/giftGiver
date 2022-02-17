import React from "react";

// components
import Navbar from "../components/Navbar";

const Home = (props) => {
    const { userEmail, setUserEmail, setAuthenticated } = props;

    return (
        <div>
            <Navbar userEmail={userEmail} setAuthenticated={setAuthenticated} setUserEmail={setUserEmail} />
        </div>
    );
};

export default Home;
