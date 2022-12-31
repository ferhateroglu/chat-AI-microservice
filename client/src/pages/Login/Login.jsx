import axios from "axios";
import React, { useState } from "react";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import validator from 'validator';

import "./Login.scss";

const Login = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const [err, setError] = useState(null);

  const navigate = useNavigate();

  const { login } = useContext(AuthContext);


  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!validator.isEmail(inputs.email)) {
        setError("Please enter a valid email address");
        return;
      }
      if (inputs.password.length < 6) {
        setError("Password must be at least 6 characters");
        return;
      }
      await login(inputs)
      setTimeout(()=>{
        navigate("/");
      },[200])
    } catch (err) {
      console.log(err)
      setError(err.response.data.message);
    }
  };
  return (
    <div className="login">
      <div className='header'>
        <h1>Edu<span>AI</span></h1>
      </div>
      <div className="email">
        <label htmlFor="email">Email Address</label>
        <div className="sec-2">
          <input
            required
            type="email"
            name="email"
            placeholder="example@mail.com"
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="password">
        <label htmlFor="password">Password</label>
        <div className="sec-2">
          <input
            required
            type="password"
            name="password"
            onChange={handleChange}
            className="pas"
            placeholder="***************" />
        </div>
      </div>
      <button  className="login" onClick={handleSubmit}>Login </button>
      <div className="footer"><Link to="/register">Sign up</Link><Link to="/forgot-password">Forgot Password?</Link></div>
      {err && <p className='error-message'>{err}</p>}
    </div>
  );
};

export default Login;