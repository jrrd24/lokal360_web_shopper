import { CircularProgress, Container } from "@mui/material";
import React from "react";

const CircleProgress = () => {
  return (
    <Container sx={{ width: "100%", height: 150 }}>
      <CircularProgress color="primary" />
    </Container>
  );
};

function LoadingCircle() {
  return (
    <Container
      sx={{
        height: 375,
        width: "100%",
        display: "flex",
        textAlign: "center",
        alignItems: "center",
      }}
    >
      <CircleProgress />
    </Container>
  );
}

export { LoadingCircle };
