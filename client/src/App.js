import React from "react";
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
    return (
        <div className="App">
            <Routes>
                <Route path="/login" element={ <Login /> } />
                <Route path="/home" element={ <Home /> } />
                <Route path="/connections" element={ <Connections /> } />
                <Route path="/edit/:id" element={ <Edit /> } />
                <Route path="/user/:id" element={ <User /> } />
            </Routes>
        </div>
    );
}

export default App;
