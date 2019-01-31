import React from "react";
import { Link } from "react-router-dom";

const linkStyle = {
  color: "white",
  textdecoration: "none",
};

const navbarStyle = {
  backgroundColor: "black",
  paddingBottom: "-30px",
  marginBottom: "20px",
};

const navBrand = {
  fontSize: "30px",
  marginBottom: "-10px",
  textdecoration: "none",
};

const navItem = {
  backgroundColor: "white",
  marginRight: "40px",
};

const navbarNav = {
  marginRight: "40px",
  marginLeft: "40px",
};

function NavbarDash() {
  return (
    <nav style={navbarStyle} className="navbar navbar-expand-lg navbar-light">
      <ul style={navBrand} className="navbar-brand">
        <Link style={linkStyle} to="/">Poem Spot</Link>
      </ul>
      <button style={navItem} className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
        <ul style={navbarNav} className="navbar-nav">
          <li className="nav-item active">
            <Link style={linkStyle} to="/" className="nav-link">Home</Link>
            <span className="sr-only">(current)</span>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavbarDash;