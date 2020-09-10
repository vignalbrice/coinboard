import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="header">
      <nav className="header_nav navbar justify-content-between">
        <div className="header_logo navbar-brand">Coinboard</div>
        <ul className="header_menu row">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
