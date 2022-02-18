import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// components
import Navbar from "../components/Navbar";
import UserCard from "../components/UserCard";

const Home = (props) => {
    const { userEmail, setUserEmail, setAuthenticated } = props;

    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        interests: [],
        customFields: [],
        cards: [],
        comments: [],
    });

    const navigate = useNavigate();

    useEffect(() => {
        // check for user authentication via userEmail state
        if (userEmail === "") {
            navigate("/login");
        }

        axios
            .get(`http://localhost:8000/api/users/${userEmail}`, {
                withCredentials: true,
            })
            .then((res) => {
                console.log(res.data);
                setUser({
                    firstName: res.data.firstName,
                    lastName: res.data.lastName,
                    email: res.data.email,
                    interests: res.data.interests,
                    customFields: res.data.customFields,
                    cards: res.data.cards,
                    comments: res.data.comments,
                });
                console.log(user);
            })
            .catch((err) => {
                console.log(err.response.data);
            });
    }, []);

    return (
        <div>
            <Navbar
                userEmail={userEmail}
                setAuthenticated={setAuthenticated}
                setUserEmail={setUserEmail}
            />
            <div className="row m-2">
                <div className="col-5">
                    <UserCard user={user} />
                </div>
                <div className="col-7"></div>
            </div>
        </div>
    );
};

export default Home;
