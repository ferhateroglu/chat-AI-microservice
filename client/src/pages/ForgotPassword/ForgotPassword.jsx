import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import validator from 'validator';

import "./ForgotPassword.scss";


const ForgotPassword = ()=>{
    const [email, setEmail] = useState(""); // edit this
    const [err, setError] = useState("");
    const [info, setInfo] = useState("");
    const navigate = useNavigate();

    const handleChange = (e)=>{
        setEmail(e.target.value);
    }

    const handleSubmit = async (e)=>{
        e.preventDefault();
        try {
            if (!validator.isEmail(email)) {
                setError("Please enter a valid email address");
                return;
              }
              await axios.post("/forgotPassword",{email})
              setError("");
              setInfo("Email sent successfully");
            
        } catch (error) {
            setError(error.response.data.message);
            setInfo("");
        }
    };

    return (
        <div className="forgot-password">
            <div className="header">
            <h1>Find your account</h1>
            </div>
            <form>
                <div className="email">
                    <label htmlFor="email">Email Address</label>
                    <div className="sec-2">
                        <input
                            required
                            type="email"
                            name="email"
                            placeholder="example@gmail.com"
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <button className="change_password" onClick={handleSubmit}>Reset Password</button>
                {err && <p className='error-message'>{err}</p>}
                {info && <p className='info-message'>{info}</p>}


            </form>
        </div>
    );
};
export default ForgotPassword;