import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginForm = (props) => {
    const { setAuthenticated } = props;

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const login = (e) => {
        e.preventDefault();

        axios
            .post(
                "http://localhost:8000/api/users/login",
                {
                    email: email,
                    password: password,
                },
                {
                    withCredentials: true,
                }
            )
            .then((res) => {
                console.log("response: ", res);
                console.log("response data: ", res.data);
                setAuthenticated(true);
                navigate("/home");
            })
            .catch((err) => {
                console.log(err.response.data);
                setErrorMessage(err.response.data.message);
            });
    };

    return (
        <div className="col card col-5 p-2 m-5">
            <h2 className="text-success">Login</h2>
            <form onSubmit={login}>
                {errorMessage ? (
                    <div className="alert alert-danger my-1">
                        {errorMessage}
                    </div>
                ) : null}
                <div className="form-group d-flex flex-column mb-3">
                    <label htmlFor="email">Email:</label>
                    <input
                        className="form-control"
                        type="email"
                        name="email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="form-group d-flex flex-column mb-3">
                    <label htmlFor="password">Password:</label>
                    <input
                        className="form-control"
                        type="password"
                        name="password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <input
                    className="btn btn-outline-success mb-2"
                    type="submit"
                    value="Login"
                />
            </form>
        </div>
    );
};

export default LoginForm;
