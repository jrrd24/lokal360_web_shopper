import { Box, Grid } from "@mui/material";
import ProductPreview from "../../../../components/Containers/ProductPreview";
import React from "react";
import { useRequestProcessor } from "../../../../hooks/useRequestProcessor";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import { LoadingCircle } from "../../../../components/Loading/Loading";

function AllProducts() {
  //API CALL GET ALL ACTIVE SITEWIDE ADS
  const { useCustomQuery } = useRequestProcessor();
  const axiosPrivate = useAxiosPrivate();

  const { data: productsData, isLoading } = useCustomQuery(
    "getAllProducts",
    () =>
      axiosPrivate.get(`/api/shopper_get/all_products`).then((res) => res.data),
    { enabled: true }
  );

  if (isLoading) {
    return <LoadingCircle />;
  }


  return (
    <Box
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <Grid container spacing={0} sx={{ display: "flex", flexWrap: "wrap" }}>
        {productsData.map((product, index) => (
          <Grid
            item
            xs={6}
            sm={4}
            md={2.4}
            key={index}
            sx={{
              my: 2,

              "@media (max-width: 900px)": {
                justifyContent: "center",
                my: 2,
              },
            }}
          >
            <ProductPreview data={product} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default AllProducts;
