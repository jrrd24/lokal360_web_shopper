import { Container, Typography } from "@mui/material";
import React from "react";
import emptySVG from "../../assets/svg/empty.svg";

const NothingFound = () => {
  return (
    <Container
      sx={{
        height: 350,
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 2,
        textAlign: "center",
        alignItems: "center",
        justifyContent: "center",
        userSelect: "none",
      }}
    >
      <img src={emptySVG} alt="Nothing Found" style={{ width: 200 }} />
      <Typography variant="subtitle1">Nothing Found</Typography>
    </Container>
  );
};

export default NothingFound;
