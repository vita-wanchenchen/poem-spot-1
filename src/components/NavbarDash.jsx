import React from "react";
import { Link } from "react-router-dom";

const linkStyle = {
  color: "white",
  textdecoration: "none",
};

const navbarStyle = {
  backgroundColor: "#392759",
  paddingBottom: "-30px",
  marginBottom: "20px",
};

const navBrand = {
  fontSize: "30px",
  marginBottom: "-10px",
  textdecoration: "none",
};

function NavbarDash() {
  return (
    <nav style={navbarStyle} className="navbar navbar-expand-lg navbar-light justify-content-center">
      <ul style={navBrand} className="navbar-brand">
        <Link style={linkStyle} to="/">Poem Spot</Link>
      </ul>
    </nav>
  );
}

export default NavbarDash;
