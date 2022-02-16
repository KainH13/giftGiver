import React, { useState } from "react";
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
    const [authenticated, setAuthenticated] = useState(false);

    const requireAuth = (nextState, replace, next) => {
        if (!authenticated) {
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
                    element={<Login setAuthenticated={setAuthenticated} />}
                />
                <Route path="/home" element={<Home />} onEnter={requireAuth} />
                <Route path="/connections" element={<Connections />} onEnter={requireAuth} />
                <Route path="/edit/:id" element={<Edit />} onEnter={requireAuth} />
                <Route path="/user/:id" element={<User />} onEnter={requireAuth} />
            </Routes>
        </div>
    );
}

export default App;
