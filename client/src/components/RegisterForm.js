import React, {useState} from "react";

const RegisterForm = (props) => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const submitHandler = (e) => {
        e.preventDefault();
    }

    return (
        <div className="col card col-5 p-2 m-5">
            <h2 className="text-primary">Register</h2>
            <form onSubmit={submitHandler}>
                <div className="form-group d-flex flex-column mb-3">
                    <label htmlFor="firstName">First Name:</label>
                    <input
                        className="form-control"
                        type="text"
                        name="firstName"
                        value={firstName}
                        onChange={(e) => {
                            setFirstName(e.target.value);
                        }}
                    />
                </div>
                <div className="form-group d-flex flex-column mb-3">
                    <label htmlFor="lastName">Last Name:</label>
                    <input
                        className="form-control"
                        type="text"
                        name="lastName"
                        value={lastName}
                        onChange={(e) => {
                            setLastName(e.target.value);
                        }}
                    />
                </div>
                <div className="form-group d-flex flex-column mb-3">
                    <label htmlFor="email">Email:</label>
                    <input
                        className="form-control"
                        type="email"
                        name="email"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                    />
                </div>
                <div className="form-group d-flex flex-column mb-3">
                    <label htmlFor="password">Password:</label>
                    <input
                        className="form-control"
                        type="password"
                        name="password"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                    />
                </div>
                <div className="form-group d-flex flex-column mb-3">
                    <label htmlFor="confirm_password">Confirm Password:</label>
                    <input
                        className="form-control"
                        type="password"
                        name="confirm_password"
                        value={confirmPassword}
                        onChange={(e) => {
                            setConfirmPassword(e.target.value);
                        }}
                    />
                </div>
                <input
                    className="btn btn-outline-primary mb-3"
                    type="submit"
                    value="Register"
                />
            </form>
        </div>
    );
};

export default RegisterForm;
