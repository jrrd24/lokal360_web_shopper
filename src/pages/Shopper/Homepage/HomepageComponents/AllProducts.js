import { Box, Button, Grid, Typography } from "@mui/material";
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
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
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

export default AllProducts;
