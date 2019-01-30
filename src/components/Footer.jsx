import React from "react";

const footerBody = {
  overflowX: "hidden",
};

const footerStyle = {
  display: "block",
  padding: "20px",
  height: "60px",
  width: "100%",
};

const footerSpan = {
  position: "fixed",
  bottom: "0",
  left: "0",
  right: "0",
  padding: "13px",
  background: "black",
  textAlign: "center",
  fontWeight: "500",
  color: "white",
};

function Footer() {
  return (
    <div className="sticky-footer" style={footerBody}>
      <footer className="footer" style={footerStyle}>
        <spn style={footerSpan}>© Dead Coders Society</spn>
      </footer>
    </div>
  );
}

export default Footer;
