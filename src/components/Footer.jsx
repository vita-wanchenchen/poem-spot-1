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
  background: "#392759",
  textAlign: "center",
  fontWeight: "500",
  color: "white",
};

function Footer() {
  return (
    <div className="sticky-footer" style={footerBody}>
      <footer className="footer" style={footerStyle}>
        <a href="https://github.com/vita-wanchenchen/poem-spot-1"><span style={footerSpan}>© Dead Coders Society</span></a>
      </footer>
    </div>
  );
}

export default Footer;
