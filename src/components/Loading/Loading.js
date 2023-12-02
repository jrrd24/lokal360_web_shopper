import { CircularProgress, Container } from "@mui/material";
import React from "react";

function LoadingCircle() {
  return (
    <Container sx={{ width: "100%", height: 150 }}>
      <CircularProgress color="primary" />
    </Container>
  );
}

export { LoadingCircle };
