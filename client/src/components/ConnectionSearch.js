import React, { useEffect, useState } from "react";
import axios from "axios";

// components
import UserCard from "./UserCard";

const ConnectionSearch = (props) => {
  const { userEmail } = props;

  const [connections, setConnections] = useState();

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/users", { withCredentials: true })
      .then((res) => {
        console.log("All Users: ", res.data);
        setConnections(res.data);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }, []);

  return (
    <div className="card p-2 my-2">
      <h2 className="text-center">Connections: </h2>
      {connections.map((user, index) => {
        if (user.email !== userEmail) {
          return <UserCard user={user} key={index} />;
        } else {
          return null;
        }
      })}
    </div>
  );
};

export default ConnectionSearch;
