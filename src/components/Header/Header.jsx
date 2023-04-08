import { Link } from "react-router-dom";
import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <div className="header">
      <Link to="/" className="title">
        Quiz Master
      </Link>
    </div>
  );
};

export default Header;
