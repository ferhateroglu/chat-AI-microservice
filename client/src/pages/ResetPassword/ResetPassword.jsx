import React from "react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import validator from 'validator';

import "./ResetPassword.scss";

const ResetPassword = () => {
    const { token } = useParams()
    const [inputs, setInputs] = useState({
        password: "",
        passwordAgain: "",
    });

    const [err, setErr] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            if (inputs.password.length < 6) {
                setErr("Password must be at least 6 characters");
                return;
            }
            if (inputs.password !== inputs.passwordAgain) {
                setErr("passwords don't match");
                return;
            }
            const password = inputs.password;
            await axios.post("/resetPassword", { newPassword: password, token });

            navigate("/");

        } catch (error) {
            setErr(error.response.data.message);
        }
    };

    return (
        <div className="auth">
            <div className="header">
                <h1>Reset Password</h1>
            </div>
            <form>
                <div className="password">
                    <label htmlFor="password">New password</label>
                    <div className="sec-2">
                        <input
                            required
                            type="password"
                            placeholder="***************"
                            name="password"
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="password">
                    <label htmlFor="password">Confirm new password</label>
                    <div className="sec-2">
                        <input
                            required
                            type="password"
                            placeholder="***************"
                            name="passwordAgain"
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <button className="change_password" onClick={handleSubmit}>Reset Password</button>
                {err && <p className='error-message'>{err}</p>}

            </form>
        </div>
    );
}
export default ResetPassword;