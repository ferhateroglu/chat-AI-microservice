import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import Logo from "../../img/logo.png";
import "./Navbar.scss";


const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);

  const [close, setclose] = useState("close");

  const handleMouseOver = () => {
    setclose("");
  };

  const handleMouseOut = () => {
    setclose("close");
  };
  return (
    <nav className={"sidebar " + close}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      <header>
        <div className="image-text">
          <span className="image">
            <img src="logo.png" alt="" />
          </span>

          <div className="text logo-text">
            <span className="name">EduAI</span>
            <span className="profession">Learn English</span>
          </div>
        </div>
      </header>

      <div className="menu-bar">
        <div className="menu">
          <ul className="menu-links">
            <li className="nav-link">
            <Link to="/">
              <i className='bx bx-home-alt icon' ></i>
                  <span className="text nav-text">Home</span>
            </Link>
            </li>

            <li className="nav-link">
              <Link to="/leaderboard">
                <i className='bx bx-bar-chart-alt-2 icon' ></i>
                <span className="text nav-text">Leaderboard</span>
              </Link>
            </li>

            <li className="nav-link">
            <Link to="/likes">
                <i className='bx bx-heart icon' ></i>
                <span className="text nav-text">Likes</span>
              </Link>
            </li>

            <li className="nav-link">
              <a href="#">
                <i className='bx bx-sun icon sun'></i>
                <span className="text nav-text">Theme</span>
              </a>
            </li>
          </ul>
        </div>
        <div className="bottom-content">
          <li className="mode nav-link">
            <a href="#">
              <i className='bx bx-log-out icon' ></i>
              <span className="text nav-text">Logout</span>
            </a>
          </li>
        </div>
      </div>

    </nav>
  );
};

export default Navbar;
