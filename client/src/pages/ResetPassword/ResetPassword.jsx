import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./ResetPassword.scss";

const ResetPassword = ()=>{
    const [password, setPassword] = useState("");
    const [err, setErr] = useState("");
    const navigate = useNavigate();

    const handleChange = (e)=>{
        setPassword(e.target.value);
    }

    const handleSubmit = async (e)=>{
        e.preventDefault();
        try {
            const res = await axios.post("/api/auth/reset-password", {password
            });
            if(res.data.success){
                navigate("/login");
            }
        } catch (error) {
            setErr(error.response.data.error);
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
                            name="password"
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <button className="change_password" onClick={handleSubmit}>Reset Password</button>
                {err && <p>{err}</p>}

            </form>
        </div>
    );
}
export default ResetPassword;