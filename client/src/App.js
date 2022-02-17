import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

// bootstrap
import "bootstrap/dist/css/bootstrap.min.css";

// views
import Login from "./views/Login";
import Home from "./views/Home";
import Connections from "./views/Connections";
import Edit from "./views/Edit";
import User from "./views/User";

function App() {
    const [userEmail, setUserEmail] = useState("");

    const requireAuth = (nextState, replace, next) => {
        if (!userEmail) {
            replace({
                pathname: "/login",
                state: { nextPathname: nextState.location.pathname },
            });
        }
        next();
    };

    return (
        <div className="App">
            <Routes>
                <Route
                    path="/login"
                    element={
                        <Login
                            setUserEmail={setUserEmail}
                        />
                    }
                />
                <Route
                    path="/home"
                    element={<Home />}
                    onEnter={requireAuth}
                    userEmail={userEmail}
                    setUserEmail={setUserEmail}
                />
                <Route
                    path="/connections"
                    element={<Connections />}
                    onEnter={requireAuth}
                    userEmail={userEmail}
                    setUserEmail={setUserEmail}
                />
                <Route
                    path="/edit/:email"
                    element={<Edit />}
                    onEnter={requireAuth}
                    userEmail={userEmail}
                    setUserEmail={setUserEmail}
                />
                <Route
                    path="/user/:email"
                    element={<User />}
                    onEnter={requireAuth}
                    userEmail={userEmail}
                    setUserEmail={setUserEmail}
                />
            </Routes>
        </div>
    );
}

export default App;
