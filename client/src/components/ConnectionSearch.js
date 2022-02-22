import React, { useEffect, useState } from "react";
import axios from "axios";

// components
import UserCard from "./UserCard";

const ConnectionSearch = (props) => {
  const { userEmail } = props;

  const [connections, setConnections] = useState([]);

  // custom sorting function to sort alphabetically by a field in an array of objects
  const dynamicSort = (field) => {
    let sortOrder = -1;

    if (field[0] === "-") {
      sortOrder = -1;
      field = field.substr(1);
    }

    return function (a, b) {
      if (sortOrder === -1) {
        return b[field].localeCompare(a[field]);
      } else {
        return a[field].localeCompare(b[field]);
      }
    };
  };

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/users", { withCredentials: true })
      .then((res) => {
        console.log("All Users: ", res.data);
        setConnections(res.data);
        setConnections.sort(dynamicSort("firstName"));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="card p-2 my-2">
      <h2>Connections: </h2>
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
