import React from "react";
import theme from "../../../Theme";
import { Box, Grid, Stack } from "@mui/material";
import ActiveAds from "./HomepageComponents/ActiveAds";
import Categories from "./HomepageComponents/Categories";
import AllProducts from "./HomepageComponents/AllProducts";
import HomepageLinks from "./HomepageComponents/HomepageLinks";
import PartnerShops from "./HomepageComponents/PartnerShops";
import BestSellers from "./HomepageComponents/BestSellers";
import NewArrivals from "./HomepageComponents/NewArrivals";
import ProductCategories from "./HomepageComponents/ProductCategories";

function HomepageContent() {
  return (
    <Box sx={{ ...classes.pageContainer }}>
      <Box sx={{ ...classes.main }}>
        <Stack spacing={3}>
          <ActiveAds />
          <BestSellers />
          <Grid container spacing={0}>
            <Grid md={6} xs={12}>
              <PartnerShops />
            </Grid>
            <Grid md={6} xs={12}>
              <NewArrivals />
            </Grid>
          </Grid>

          <HomepageLinks />
          <ProductCategories />
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
    maxWidth: 1200,
    width: "100%",
  },
};
export default HomepageContent;
