import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthContexProvider = ({ children }) => {

  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );


  const login = async (inputs) => {
    const res = await axios.post("/login", inputs);
    setCurrentUser(res.data);
    return res;
  };

  const logout = async () => {
    setCurrentUser(null);
  };

  useEffect(() => {
    axios.defaults.headers.common['Authorization'] = currentUser ? ("Barear "+currentUser.token) : null;
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
