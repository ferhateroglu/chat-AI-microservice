import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import validator from 'validator';

import "./Register.scss"

const Register = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [err, setError] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (inputs.username.length < 4) {
        setError("Username must be at least 4 characters");
        return;
      }
      if (!validator.isEmail(inputs.email)) {
        setError("Please enter a valid email address");
        return;
      }
      if (inputs.password.length < 6) {
        setError("Password must be at least 6 characters");
        return;
      }
      await axios.post("/signUp", inputs);
      navigate("/login");
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  return (
    <div className="register">
      <div className="header">
        <h1>Register</h1>
      </div>
      <form>
        <div className="username">
          <label htmlFor="text">Username</label>
          <div className="sec-2">
            <input
              required
              type="text"
              placeholder="username"
              name="username"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="email">
          <label htmlFor="email">Email Address</label>
          <div className="sec-2">
            <input
              required
              type="email"
              placeholder="email"
              name="email"
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
              placeholder="password"
              name="password"
              onChange={handleChange}
            />
          </div>
        </div>
        <button className="btn-register" onClick={handleSubmit}>Register</button>
        {err && <p className='error-message'>{err}</p>}
        <span className="footer">
          Do you have an account? <Link to="/login">Login</Link>
        </span>
      </form>
    </div>
  );
};

export default Register;
