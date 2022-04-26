import axios from "axios";
import React, { useEffect, useState } from "react";

// components
import UserCard from "./UserCard";

const ConnectionRequests = (props) => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    // get requests and populated sender info for user
    axios
      .get("http://localhost:8000/api/user/requests/for/populated", {
        withCredentials: true,
      })
      .then((res) => {
        console.log("Requests for user: ", res.data);
        setRequests(res.data);
      })
      .catch((err) => {
        console.log("Error getting request for user", err.response.data);
      });
  }, []);

  return (
    <div className="card p-2 my-2 shadow">
      <h2 className="text-muted text-center">Connection Requests</h2>
      {requests
        ? requests.map((request, index) => {
            return (
              <UserCard
                user={request.sender}
                requestId={request._id}
                connectionStatus={"pendingFor"}
                key={index}
              />
            );
          })
        : null}
    </div>
  );
};

export default ConnectionRequests;
