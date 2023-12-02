import React from "react";
import { useLocation } from "react-router-dom";
import { Container } from "@mui/system";
import { Typography } from "@mui/material";
import { Stack } from "@mui/system";

function RouterError() {
  const location = useLocation();

  return (
    <Container id="error-page" sx={{ width: "100%", pt: 10 }}>
      <img
        src={require("../../assets/404.jpg")}
        alt="404 Error"
        style={{ width: "22rem", height: "15rem" }}
      />

      <Stack spacing={2}>
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          Meow!
        </Typography>
        <Stack spacing={0}>
          <Typography variant="h6" sx={{ fontWeight: "medium" }}>
            Error 404:
          </Typography>
          <Typography variant="subtitle">
            The page at <i>{location.pathname}</i> does not exist.
          </Typography>
        </Stack>
      </Stack>
    </Container>
  );
}

export default RouterError;
