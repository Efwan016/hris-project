import React from "react";

const Footer = () => {
  return (
    <footer
      style={{
        backgroundColor: "transparent",
        color: "#d1d5db",
        textAlign: "center",
        padding: "1rem",
        marginTop: "auto",
      }}
    >
      <p>
        &copy; {new Date().getFullYear()} Employee Management System.  
        <span style={{ color: "#60a5fa" }}> All Rights Reserved.</span>
      </p>
    </footer>
  );
};

export default Footer;
