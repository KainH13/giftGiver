import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

// bootstrap
import "bootstrap/dist/css/bootstrap.min.css";

// views
import Login from "./views/Login";
import Home from "./views/Home";
import UserSearch from "./views/UserSearch";
import Edit from "./views/Edit";

function App() {
  const [userEmail, setUserEmail] = useState("");

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login setUserEmail={setUserEmail} />} />
        <Route path="/login" element={<Login setUserEmail={setUserEmail} />} />
        <Route
          path="/home"
          element={<Home userEmail={userEmail} setUserEmail={setUserEmail} />}
        />
        <Route
          path="/edit/:email"
          element={<Edit userEmail={userEmail} setUserEmail={setUserEmail} />}
        />
        <Route
          path="/search"
          element={<UserSearch userEmail={userEmail} setUserEmail={setUserEmail} />}
        />
      </Routes>
    </div>
  );
}

export default App;
