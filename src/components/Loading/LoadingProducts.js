import React from "react";
import { Box, Skeleton } from "@mui/material";
import theme from "../../Theme";

function LoadingProduct() {
  return (
    <Box sx={{ ...classes.main }}>
      {/*Prod Image */}
      <img
        src={require("../../assets/product_placeholder.jpg")}
        style={{ ...classes.image }}
      />
      {/*Prod Details */}
      <Box sx={{ ...classes.prodDetailsContainer }}>
        <Skeleton sx={{ ...classes.prodName }} />
        <Skeleton sx={{ ...classes.star }} />
        <Skeleton sx={{ ...classes.price }} />
      </Box>
    </Box>
  );
}

const classes = {
  main: {
    height: 280,
    width: 180,
    backgroundColor: `${theme.palette.background.paper}`,
    borderRadius: "10px",
    border: `solid 1px ${theme.palette.text.ten}`,
    textAlign: "left",
  },

  image: {
    objectFit: "cover",
    objectPosition: "center",
    height: 180,
    width: 180,
    borderTopLeftRadius: "10px",
    borderTopRightRadius: "10px",
  },

  prodDetailsContainer: {
    p: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    height: 100,
  },

  prodName: {
    height: 30,
    width: "100%",
  },

  star: {
    height: 20,
    width: "60%",
  },

  price: {
    height: 20,
    width: "30%",
  },
};

export { LoadingProduct };
