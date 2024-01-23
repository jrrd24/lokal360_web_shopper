import { Box, Button, Grid, Typography, useMediaQuery } from "@mui/material";
import ProductPreview from "../../../../components/Containers/ProductPreview";
import React from "react";
import { useRequestProcessor } from "../../../../hooks/useRequestProcessor";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import { LoadingCircle } from "../../../../components/Loading/Loading";
import theme from "../../../../Theme";

function AllProducts() {
  //API CALL GET ALL ACTIVE SITEWIDE ADS
  const { useCustomQuery } = useRequestProcessor();
  const axiosPrivate = useAxiosPrivate();

  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const { data: productsData, isLoading } = useCustomQuery(
    "getAllProducts",
    () =>
      axiosPrivate
        .get(`/api/shopper_get/all_products/?limit=50`)
        .then((res) => res.data),
    { enabled: true }
  );

  if (isLoading) {
    return <LoadingCircle />;
  }

  return (
    <Box>
      <Box sx={{ ...classes.container }}>
        <Typography
          variant="sectionTitle"
          color={"primary"}
          fontSize={isSmallScreen ? 28 : 32}
        >
          ⭐ Daily Discover ⭐
        </Typography>
      </Box>

      <Grid container spacing={2}>
        {productsData?.map((product, index) => (
          <Grid item xs={6} sm={4} md={2.4} key={index} sx={{ my: 2 }}>
            <ProductPreview data={product} />
          </Grid>
        ))}
      </Grid>
      <Button
        variant="outlined"
        fullWidth
        sx={{
          maxWidth: 300,
          background: theme.palette.background.paper,
          my: 3,
        }}
      >
        <Typography variant="subtitle1" sx={{ textTransform: "capitalize" }}>
          See More
        </Typography>
      </Button>
    </Box>
  );
}

const classes = {
  container: {
    py: 1,
    marginY: 1,
    borderRadius: 3,
    backgroundColor: theme.palette.background.paper,
    userSelect: "none",
    border: `solid 3px ${theme.palette.primary.main}`,
    borderBottom: `solid 9px ${theme.palette.primary.main}`,
  },
};

export default AllProducts;
