import React from "react";

// components
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";

const Login = (props) => {
  const { setUserEmail } = props;

  return (
    <div>
      <div className="navbar d-flex justify-content-start align-items-start">
        <h1 className="ms-3 my-1 text-primary">GiftIt :)</h1>
        <h4 className="m-3 text-secondary">Better gifts for everyone!</h4>
      </div>
      <h1 className="text-center text-secondary">Welcome to GiftIt</h1>
      <div className="row m-2">
        <RegisterForm />
        <LoginForm setUserEmail={setUserEmail} />
      </div>
    </div>
  );
};

export default Login;
