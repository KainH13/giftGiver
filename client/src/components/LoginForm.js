import React from "react";

const LoginForm = (props) => {
    return (
        <div className="col card col-5 p-2 m-5">
            <h2 className="text-success">Login</h2>
            <form action="/user/login" method="POST">
                <div className="form-group d-flex flex-column mb-3">
                    <label htmlFor="email">Email:</label>
                    <input className="form-control" type="email" name="email" />
                </div>
                <div className="form-group d-flex flex-column mb-3">
                    <label htmlFor="password">Password:</label>
                    <input
                        className="form-control"
                        type="password"
                        name="password"
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