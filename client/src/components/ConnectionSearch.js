import React, { useEffect } from "react";

// components
import UserCard from "./UserCard";

const ConnectionSearch = (props) => {
  const { connections, setConnections, dynamicSort } = props;

  useEffect(() => {
    // sort connections by firstName
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
