import React from "react";
import theme from "../../../Theme";
import { Box, Stack } from "@mui/material";
import ActiveAds from "./HomepageComponents/ActiveAds";
import Categories from "./HomepageComponents/Categories";
import AllProducts from "./HomepageComponents/AllProducts";

function HomepageContent() {
  return (
    <Box sx={{ ...classes.pageContainer }}>
      <Box sx={{ ...classes.main }}>
        <Stack spacing={3}>
          <ActiveAds />
          <Categories />
          <AllProducts />
        </Stack>
      </Box>
    </Box>
  );
}

const classes = {
  pageContainer: {
    ...theme.components.box.pageContainer,
    display: "flex",
    justifyContent: "center",
  },
  main: {
    maxWidth: 900,
    width: 900,
    "@media (max-width: 900px)": { width: "100%" },
  },
};
export default HomepageContent;
