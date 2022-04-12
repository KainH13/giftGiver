import React, { useEffect, useState } from "react";

// components
import UserCard from "./UserCard";

const ConnectionSearch = (props) => {
  const { connections, setConnections } = props;

  // custom sorting function to sort alphabetically by a field in an array of objects
  // TODO - elevate to Home component so that this sorting helper can be used for cards too
  const dynamicSort = (field) => {
    let sortOrder = 1;

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
    // sort connections by firstName
    console.log(connections);
    let tempArray = connections;
    tempArray.sort(dynamicSort("firstName"));
    setConnections(tempArray);
  }, []);

  return (
    <div className="card p-2 my-2 shadow">
      <h2 className="text-muted">Connections: </h2>
      {connections.map((connection, index) => {
        return (
          <UserCard user={connection} connectionStatus={"accepted"} key={index} />
        );
      })}
    </div>
  );
};

export default ConnectionSearch;
