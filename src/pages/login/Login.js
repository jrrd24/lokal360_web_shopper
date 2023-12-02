import React, { useEffect } from "react";
import LoginForm from "./LoginForm";
import LoginHeader from "./LoginHeader";
import { Box, Container, Stack } from "@mui/material";
import Grid from "@mui/material/Grid";

const Login = () => {
  //Set Page Title
  useEffect(() => {
    document.title = "Login | Lokal 360";
    return () => {
      document.title = "Lokal 360";
    };
  }, []);

  return (
    <Container
      disableGutters
      maxWidth="100%"
      sx={{
        height: "100vh",
        background: "linear-gradient(to right bottom, #E4E1F9, #ACA4EC)",
      }}
    >
      <LoginHeader />

      <Box
        sx={{
          minHeight: "90vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <Box sx={{ display: { xs: "none", lg: "block", xl: "block" } }}>
          <img
            src={require("../../assets/login_web.png")}
            style={{ width: 600, height: "auto" }}
            alt="Logo"
          />
        </Box>

        <Box>
          <LoginForm />
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
