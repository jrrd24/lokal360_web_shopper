import { Box, Container } from "@mui/material";
import React from "react";
import LoginHeader from "../login/LoginHeader";
import RegisterContent from "./RegisterContent";

function Register() {
  return (
    <Container
      disableGutters
      maxWidth="100%"
      sx={{
        height: "100vh",
        background: "linear-gradient(to right bottom, #E4E1F9, #ACA4EC)",
      }}
    >
      <Box
        sx={{
          minHeight: "90vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <Box>
          <RegisterContent />
        </Box>
      </Box>
    </Container>
  );
}

export default Register;
