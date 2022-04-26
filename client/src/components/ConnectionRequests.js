import axios from "axios";
import React, { useEffect, useState } from "react";

// components
import UserCard from "./UserCard";


const ConnectionRequests = (props) => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    // get requests and populated sender info for user
    axios.get()
  })

  return <div>Connection Requests</div>;
};

export default ConnectionRequests;
