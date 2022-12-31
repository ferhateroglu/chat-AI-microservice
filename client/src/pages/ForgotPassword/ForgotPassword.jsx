import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./ForgotPassword.scss";


const ForgotPassword = ()=>{
    const [email, setEmail] = useState(""); // edit this
    const [err, setErr] = useState("");
    const navigate = useNavigate();

    const handleChange = (e)=>{
        setEmail(e.target.value);
    }

    const handleSubmit = async (e)=>{
        e.preventDefault();
        try {
            const res = await axios.post("/api/auth/forgot-password", {email});
            if(res.data.success){
                navigate("/reset-password");
            }
        } catch (error) {
            setErr(error.response.data.error);
        }
    };

    return (
        <div className="auth">
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
                {err && <p>{err}</p>}

            </form>
        </div>
    );
};
export default ForgotPassword;