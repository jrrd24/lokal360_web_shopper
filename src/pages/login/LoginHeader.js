import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";

const LoginHeader = () => {
  const appBarStyle = {
    backgroundColor: "#FFFFFF",
    zIndex: 1,
    top: 0,
    width: "100%",
  };

  const logoStyle = {
    marginRight: "8px",
    width: 60,
    height: 60,
  };

  const wordmarkStyle = {
    marginRight: "8px",
    width: 100,
    height: 40,
  };

  return (
    <AppBar position="sticky" style={appBarStyle}>
      <Toolbar>
        <img
          src={require("../../assets/lokal360_Logo.png")}
          alt="Logo"
          style={logoStyle}
        />
        <img
          src={require("../../assets/wordmark.png")}
          alt="Logo"
          style={wordmarkStyle}
        />
      </Toolbar>
    </AppBar>
  );
};

export default LoginHeader;