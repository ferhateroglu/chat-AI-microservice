import axios from "axios";
import React, { useState } from "react";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";

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
      await login(inputs)
      navigate("/");
    } catch (err) {
      console.log(err)
      setError(err.response.data.message);
    }
  };
  return (
    <div className="auth">
      <div className='header'>
        <h1>Edu<span>AI</span></h1>
      </div>
      <div className="email">
        <label htmlFor="email">Email Address</label>
        <div className="sec-2">
          <input
            required
            type="email"
            placeholder="username"
            name="email"
            placeholder="Username@gmail.com"
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
            className="pas"
            placeholder="***************" />
        </div>
      </div>
      <button  className="login" onClick={handleSubmit}>Login </button>
      <div className="footer"><Link to="/register">Sign up</Link><Link to="/forgot-password">Forgot Password?</Link></div>
      {err && <p className='error'>{err}</p>}
    </div>
  );
};

export default Login;