import './header.css'
import React, { useState, useEffect } from "react";
import {Link, useNavigate } from "react-router-dom";
import { message } from "antd";
import image from './images.png'
const Header = () => {
  const [loginUser, setLoginUser] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setLoginUser(user);
    }
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem("user");
    message.success("Logout Successfully");
    navigate("/login");
  };

    return (
        <header>
          <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <img src={image} className="img-top image" alt="...">
            </img>
        <div className="container-fluid">
          <small className="navbar-brand">Expense Tracker</small>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to='/' className="nav-link active" aria-current="page">Home</Link>
              </li>
              <li className="nav-item">
                <Link to ='/about' className="nav-link active" aria-current="page">About</Link>
              </li>
              
            </ul>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person" viewBox="0 0 16 16">
  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z"/>
</svg>
            <div className="navbar-text txt">
        {loginUser && loginUser.name}
      </div>
              
              <button className="btn btn-outline-dark" onClick={logoutHandler}>Logout</button>
          </div>
        </div>
      </nav>
        </header>
        
        );
        
     

    
};

export default Header;