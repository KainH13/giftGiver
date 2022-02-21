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
  const [userEmail, setUserEmail] = useState("");

  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login setUserEmail={setUserEmail} />} />
        <Route
          path="/home"
          element={<Home userEmail={userEmail} setUserEmail={setUserEmail} />}
        />
        <Route
          path="/connections"
          element={
            <Connections userEmail={userEmail} setUserEmail={setUserEmail} />
          }
        />
        <Route
          path="/edit/:email"
          element={<Edit userEmail={userEmail} setUserEmail={setUserEmail} />}
        />
        <Route
          path="/user/:email"
          element={<User userEmail={userEmail} setUserEmail={setUserEmail} />}
        />
      </Routes>
    </div>
  );
}

export default App;
