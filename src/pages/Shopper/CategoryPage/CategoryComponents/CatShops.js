import React from "react";
import { useRequestProcessor } from "../../../../hooks/useRequestProcessor";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import { LoadingCircle } from "../../../../components/Loading/Loading";
import ShopContainer from "../../../../components/Containers/ShopContainer";
import { Box, Grid } from "@mui/material";

function CatShops({ categoryName }) {
  //API CALL GET ALL ACTIVE SITEWIDE ADS
  const { useCustomQuery } = useRequestProcessor();
  const axiosPrivate = useAxiosPrivate();

  const { data: shopData, isLoading } = useCustomQuery(
    "getCatShops",
    () =>
      axiosPrivate
        .get(`/api/shopper_get/all_shops/?filter=${categoryName}`)
        .then((res) => res.data),
    { enabled: true }
  );

  if (isLoading) {
    return <LoadingCircle />;
  }

  console.log(shopData);
  return (
    <Box
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <Grid container spacing={0} sx={{ display: "flex", flexWrap: "wrap" }}>
        {shopData.map((shop, index) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={6}
            key={index}
            sx={{
              display: "flex",
              justifyContent: "center",
              my: 2,
            }}
          >
            <ShopContainer data={shop} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default CatShops;
