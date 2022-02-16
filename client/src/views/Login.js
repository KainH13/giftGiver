import React from "react";

// components
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";

const Login = (props) => {
    return (
        <div>
            <div className="navbar d-flex justify-content-start align-items-start">
                <h1>GiftIt</h1>
                <h4 className="m-3">Better gifts for everyone!</h4>
            </div>
            <h1 className="text-center">Welcome</h1>
            <div className="row">
                <LoginForm />
                <RegisterForm />
            </div>
        </div>
    );
};

export default Login;
