import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
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
      await axios.post("/auth/register", inputs);
      navigate("/login");
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <div className="auth">
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
        {err && <p>{err}</p>}
        <span className="footer">
          Do you have an account? <Link to="/login">Login</Link>
        </span>
      </form>
    </div>
  );
};

export default Register;
