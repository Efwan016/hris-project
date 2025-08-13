import React from "react";

const Footer = () => {
  return (
    <footer
      style={{
        backgroundColor: "transparent",
        color: "#000",
        textAlign: "center",
        padding: "1rem",
        marginTop: "auto",
      }}
    >
      <p>
        &copy; {new Date().getFullYear()} HRIS-App web.  
        <span style={{ color: "#60a5fa" }}> All Rights Reserved.</span>
      </p>
    </footer>
  );
};

export default Footer;