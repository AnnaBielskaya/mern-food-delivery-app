import React from "react";
import { Link } from "react-router-dom";

import logo from "../assets/img/logo.svg";

const Header = () => {
  return (
    <div className="d-flex col-10 align-self-center justify-content-between py-4">
      <Link to="/">
        <img
          style={{ maxWidth: "140px" }}
          className="logo"
          src={logo}
          alt="website-logo"
        />
      </Link>

      <Link to="/sign-in">
        <button>Sign In</button>
      </Link>
    </div>
  );
};

export default Header;
